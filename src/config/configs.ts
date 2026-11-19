import validationSchema from "./validation.schema"

export default () => {
    const parsed = validationSchema.safeParse(process.env)
    if (!parsed.success) {
        console.error("Invalid environment variables", { cause: parsed.error })
        process.exit(1)
    }
    return {
        app: {
            env: parsed.data.NODE_ENV
        },
        rmq: {
            url: parsed.data.RMQ_URL,
            queue: parsed.data.RMQ_QUEUE
        }
    }
}