docker build --rm  -t support-api . && docker run --rm --name support_api_cont -p 8088:8080 support-api