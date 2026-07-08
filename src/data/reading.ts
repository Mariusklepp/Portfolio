/**
 * The bookshelf on the About page: the book Marius is reading right now,
 * a light list of what he's read, and what's planned next.
 *
 * Truth rule: only real titles Marius actually reads/read/plans. The whole
 * Reading section stays hidden until something is filled in here, so an empty
 * file is always safe.
 */
export interface Book {
  title: string
  author: string
  /** Optional one-liner in Marius's voice (what it's about / why it's on the list). */
  note?: string
}

export interface Reading {
  current: Book | null
  read: Book[]
  planned: Book[]
}

export const reading: Reading = {
  current: null,
  read: [],
  planned: [],
}
