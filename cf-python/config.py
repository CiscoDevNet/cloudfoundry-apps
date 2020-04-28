import os

bind = "0.0.0.0:{port}".format(port=os.getenv('VCAP_APP_PORT', '8080'))
workers = 3
