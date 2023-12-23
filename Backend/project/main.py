from fileinput import filename
from locale import currency
from sqlite3 import paramstyle
from itertools import repeat
# from django.shortcuts import render
from flask import (
    Flask,
    app,
    render_template,
    redirect,
    request,
    url_for,
    flash,
    session,
    Blueprint,
    escape,
    current_app,
    jsonify,
    json,
    make_response,
    send_file,
    send_from_directory,
    Response,
)
import pymssql
import datetime
from datetime import date, timedelta, timezone
import time
import pandas as pd
import statistics
import math
import calendar
from calendar import monthrange
from num2words import num2words
import uuid
from io import BytesIO
from fpdf import FPDF
import decimal
import qrcode
import base64
import requests
import uuid
from fiscalyear import *
import fiscalyear
import logging
import os
import numpy as np
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import base64
from Cryptodome.Cipher import AES
import socket
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from io import StringIO


main = Blueprint("main", __name__)


def csrf_error(reason):
    return ("CSRF Error: ", reason)


@main.route('/index', methods=["GET",'POST'])
def index():
    if request.method == 'GET':
        return ('Index Get Request')
    else:
        return("Post Request")
    