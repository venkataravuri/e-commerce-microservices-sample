FROM python:3.11-alpine

# 필요한 패키지 설치
RUN apk --no-cache add build-base libffi-dev openssl-dev
RUN pip install pipenv

WORKDIR /usr/src/app

# Copy the Pipfile and Pipfile.lock from the local directory to the WORKDIR
COPY Pipfile* ./

# Install dependencies inside the virtual environment
RUN pipenv install --deploy --ignore-pipfile

# copy the local app/ folder to the /app folder in the container
COPY . .

# execute the command python main.py (in the WORKDIR) to start the app
CMD ["pipenv", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--reload"]