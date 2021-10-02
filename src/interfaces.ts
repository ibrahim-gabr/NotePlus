export interface action {
  name: string
  icon: any
  click: string
}
export interface Tag {
  name: string
  id: number
  notes: Note[]
  label?:string
}
export interface Note {
  id?: number
  title: string
  body: string
  created_at?: string
  tags?: Tag[]
  tag_ids?: number[]
  
}

export interface NoteState {
  notes: Note[]
}
export interface TagState {
  tags: Tag[]
}
