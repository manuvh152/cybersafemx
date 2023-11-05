import { CreateAnswerBulkDto } from "src/answers/dto/create-answer.dto";

enum Difficulty{
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export class CreateQuestionDto{
  question_text: string
  difficulty?: Difficulty
  //topic_idL number
  topic_id
}

export class CreateQuestionBulkDto{
  question_text: string
  difficulty?: Difficulty
  topic_id // Include topic_id
  answers: CreateAnswerBulkDto[]
}

export class CreateQuestionBulkDto2{
  question_text: string
  difficulty?: Difficulty
  answers: CreateAnswerBulkDto[]
}