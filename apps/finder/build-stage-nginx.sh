#!/usr/bin/env bash

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin "$(aws sts get-caller-identity --query Account --output text).dkr.ecr.ap-northeast-2.amazonaws.com"

docker build -t $(aws sts get-caller-identity --query Account --output text).dkr.ecr.ap-northeast-2.amazonaws.com/finder-web-nginx:$1 -f Dockerfile.nginx .

docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.ap-northeast-2.amazonaws.com/finder-web-nginx:$1
