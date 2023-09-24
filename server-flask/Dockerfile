FROM python:3.9-alpine
RUN pip install Flask
RUN pip install Flask-Cors
RUN pip install pandas
RUN pip install gunicorn
WORKDIR /backend

EXPOSE 8080
COPY . .
CMD ["gunicorn", "wsgi:create_app()", "-w 1", "-b 0.0.0.0:8080", "-t 30"]