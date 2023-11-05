export class CreateAnswerDto{
  answer_text: string
  is_correct: boolean
  //question_id: number
  question_id
}

export class CreateAnswerBulkDto{
  answer_text: string
  is_correct: boolean
  question_id
}