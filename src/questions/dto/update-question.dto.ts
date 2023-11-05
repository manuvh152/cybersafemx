enum Difficulty{
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export class UpdateQuestionDto{
  question_text?: string
  difficulty?: Difficulty
}