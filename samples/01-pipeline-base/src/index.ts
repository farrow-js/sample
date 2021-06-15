import { createPipeline } from 'farrow-pipeline'

// 1. 创建
const pipeline = createPipeline<number, number>()

// 2. 添加函数
pipeline.use((count, next) => {
  return next(count + 1)
})
pipeline.use((count, next) => {
  return count * 2
})

// 3. 执行
console.log(pipeline.run(1)) // 4 = (1 + 1) * 2
console.log(pipeline.run(5)) // 12 = (5 + 1) * 2
