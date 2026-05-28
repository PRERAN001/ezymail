
class MailQueue {

    constructor({
        totalMails = 100,
        batchSize = 20,
        concurrency = 5
    } = {}) {

        this.totalMails = totalMails
        this.batchSize = batchSize
        this.concurrency = concurrency
    }

    async process(tasks = []) {

        const limitedTasks = tasks.slice(0, this.totalMails)

        for (
            let i = 0;
            i < limitedTasks.length;
            i += this.batchSize
        ) {

            const batch = limitedTasks.slice(
                i,
                i + this.batchSize
            )

            await this.runBatch(batch)

            console.log(
                `Batch ${i / this.batchSize + 1} completed`
            )
        }
    }

    async runBatch(batch) {

        let index = 0

        const worker = async () => {

            while (index < batch.length) {

                const current = index++

                await batch[current]()
            }
        }

        const workers = Array(this.concurrency)
            .fill(null)
            .map(worker)

        await Promise.all(workers)
    }
}

module.exports = MailQueue