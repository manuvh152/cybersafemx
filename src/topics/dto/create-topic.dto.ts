import { CreateQuestionBulkDto2 } from "src/questions/dto/create-question.dto"

enum Difficulty{
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export class CreateTopicDto{
  name: string
  video_url: string
  description: string
  created_by: string
  difficulty?: Difficulty
}

export class CreateTopicBulkDto{
  name: string
  video_url: string
  description: string
  created_by: string
  difficulty?: Difficulty
  questions: CreateQuestionBulkDto2[]
}