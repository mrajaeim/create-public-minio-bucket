# Create a public bucket for minio automatically

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
- Change .env

   change environment with your custom data


- Run scripts

```shell
python create_public_bucket.py
```
