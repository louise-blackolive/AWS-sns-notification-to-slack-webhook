## AWS-sns-notification-to-slack-webhook
 export the messages from sns notification to slack channel


SNS 알림 메세지를 Slack Webhook을 통해 알림받기
=================================
[Go to english page](./Readme.en.md)

본 워크샵에서는 AWS의 Serverless 서비스를 통해 알림 발생, 구독, 함수를 통한 슬랙 챗봇 사용 등 인프라 운영 및 모니터링에 필요한 시스템을 구현 해 봅니다.

이 실습은 [Amazon Simple Email Service](https://aws.amazon.com/ko/ses/),[Amazon CloudWatch](https://aws.amazon.com/ko/cloudwatch/),[Amazon Simple Notification Service](https://aws.amazon.com/ko/sns/),[AWS Lambda](https://aws.amazon.com/ko/lambda/)를 활용합니다.
Amazon SES서비스는 대량 메일 발송 서비스로, 대외 서비스를 구축할 때 유저들에게 공지 이메일이나 마케팅 용도의 이메일을 한꺼번에 발송하기 유리한 서비스입니다.
하지만 받는메일이 유효한 이메일이 아닌 비율이 높거나, 혹은 스팸메일의 발송처로 악용 될 소지가 있어 반송과 스팸처리에 대한 관리가 필요합니다.
따라서 이번 실습을 통해 Amazon SES에서 발생하는 Bounce 메일을 모니터링 및 알람을 받아볼 수 있도록 자동화 시스템을 구현합니다.
우선 Amazon SES에서 발생하는 Bounce rate를 CloudWatch를 통해 모니터링합니다.
CloudWatch Alarm 기능을 통해 특정 매트릭값에 부합 할 경우 Amazon SNS 라는 Publication/Subscription 기반의 메시징 서비스를 통해 email 또는 문자로 알림을 받아볼 수 있습니다.
여기에 Amazon SNS로 발생하는 알림을 Lambda 함수를 통해 트리거링 및 해당 메시지를 Slack Channel로 푸시하는 기능을 구현할 수 있습니다.

전체 아키텍처 그림은 아래 다이어그림을 참조하십시오.

<!--아키텍쳐 이미지 블라블라 -->
![](media/image2.png)

필수 준비 사항
==============

