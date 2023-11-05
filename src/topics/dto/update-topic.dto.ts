enum Difficulty{
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export class UpdateTopicDto{
  name?: string
  video_url?: string
  description?: string
  created_by?: string
  difficulty?: Difficulty
}