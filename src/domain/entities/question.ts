import { randomUUID } from "crypto"
import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface QuestionProps {
  authorId: string,
  bestAnswerId?: UniqueEntityId
  title: string,
  content: string, 
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}


export class Question extends Entity<QuestionProps>{
}