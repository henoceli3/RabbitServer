import { connect } from "amqplib";


const connectRabbitServer = () => {
    return connect({
        hostname:
            "b-05e91662-2e5f-4d08-b2c0-0e580f88c71d.mq.eu-north-1.amazonaws.com",
        protocol: "amqps",
        port: 5671,
        username: "ouatt",
        password: "R@bbitP@ssWord2023",
    });
}

export default connectRabbitServer