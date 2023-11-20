# Create a public bucket for minio automatically

## Usage

- Change .env

   change environment with your custom data

- Follow helps for executing NodeJs or Python script

## NodeJs

```shell
npm i
npm start
```

## Python

- Add venv

```shell
python -m venv ./venv
```

- Activate venv

```shell
# bash/zsh
source venv/bin/activate

# Windows cmd
venv\Scripts\activate.bat

# Windows PowerShell
venv\Scripts\Activate.ps1
```

- Install requirements

```shell
pip install -r requirements.txt
```

- Run scripts

```shell
python create_public_bucket.py
```
