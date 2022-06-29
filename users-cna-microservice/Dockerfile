# Install python in the container
FROM python:3.10.5-alpine3.16
RUN pip install pipenv
WORKDIR /usr/src/app
# Copy the Pipfile
COPY Pipfile ./
# install the packages from the requirements.txt file in the container
RUN pipenv install
# expose the port that uvicorn will run the app
EXPOSE 9090
# copy the local app/ folder to the /app fodler in the container
COPY . .
# execute the command python main.py (in the WORKDIR) to start the app
CMD ["pipenv", "run", "python", "app.py"]