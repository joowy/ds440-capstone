import argparse
import time

import cv2
import dlib
import imutils
import numpy as np
import win32api
from imutils import face_utils
from imutils.video import VideoStream
from scipy.spatial import distance
from win32con import KEYEVENTF_EXTENDEDKEY, VK_MEDIA_PLAY_PAUSE
from pynput.keyboard import Key, Controller
import pynput


def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    EAR = (A + B) / (2.0 * C)
    return EAR


keyboard = Controller()

threshold_value = 0.20
frames = 200

detect = dlib.get_frontal_face_detector()
# load facial landmark model
predict = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]


# find the correct camera number of device
for i in range(-2, 10):
    cap = cv2.VideoCapture(i)
    if cap.read()[0]:
        break
flag = 0


while True:
    # read data from camera capture
    ret, frame = cap.read()
    # normalize image
    frame = imutils.resize(frame, width=450)
    # grayscale image
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # detect facial objects
    objects = detect(gray, 0)
    for x in objects:
        shape = predict(gray, x)
        shape = face_utils.shape_to_np(shape)

        # get landmarks
        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]
        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)

        EAR = (leftEAR + rightEAR) / 2.0

        leftEyeHull = cv2.convexHull(leftEye)
        rightEyeHull = cv2.convexHull(rightEye)

        # draw outlines of eyes
        cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

        if EAR < threshold_value:
            flag += 1
            print(flag)
            if flag >= frames:
                # send pause command
                win32api.keybd_event(VK_MEDIA_PLAY_PAUSE, 34)

                cv2.destroyAllWindows()
                cap.release()
                break
        else:
            flag = 0
    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        cv2.destroyAllWindows()
        cap.release()
        break
