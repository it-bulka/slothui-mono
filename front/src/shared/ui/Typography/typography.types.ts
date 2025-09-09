import type { HTMLAttributes } from 'react';

export type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

export type HeadingType = HTMLAttributes<HTMLHeadingElement>
export type ParagraphType = HTMLAttributes<HTMLParagraphElement>
export type SpanType = HTMLAttributes<HTMLSpanElement>

export enum TypographyTypes {
  TITLE = 'title',
  BLOCK_TITLE = 'block_title',
  P = 'paragraph',
  P_SM = 'paragraph_small',
  SUBTITLE = 'subtitle',
}