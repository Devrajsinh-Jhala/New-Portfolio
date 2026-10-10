# Redrawing the portrait sheets

The portrait comes from two sprite sheets in `art/sprites/`. This is how to redraw them, for a new outfit or expression, so the new sheets drop into the site with no code changes.

## How to do it

1. In the image tool, attach `art/sprites/character-directions.webp` as the reference and paste a prompt like prompt 1 below.
2. Then attach the **new** directions sheet together with `art/sprites/character-reactions.webp` and paste a prompt like prompt 2, so the clothes match across both sheets.
3. Resize the results to 1254 × 1254, save them as WebP over the two files in `art/sprites/`, and run `node scripts/tint-portrait.mjs`.

## What must stay the same

The site cuts the sheets up by position, so these keep it working with no code changes.

- **Grid:** one square image, 3 × 3 equal cells, no gaps, borders, labels or text.
- **Order:** the cells stay in the order listed below.
- **Framing:** head and shoulders, the same size and position in every cell. Head centred, a little space above the hair, shoulders cut off by the bottom edge.
- **Circle crop:** each cell is shown inside a circle, so nothing important goes in the corners.
- **Backdrop:** one flat dark navy (`#1E334C`) in every cell, including the top-left corner of the sheet. No gradient, texture or vignette. The script replaces this navy with the site's lavender.
- **Likeness and style:** same face, hair, beard and skin tone as the reference.

## What keeps it friendly

The first sheets read as stern, so the current ones were drawn to these rules.

- **Expression:** relaxed in every cell. A slight closed-mouth smile, soft eyes, brows at rest.
- **Chin:** level. In the "up" cells he glances up with a small tilt, not a raised chin.
- **Clothes:** a plain crew-neck t-shirt or an open hoodie in a warm light colour, such as cream or warm grey. No black, no high collar.
- **Colour to avoid in clothes:** navy. Anything the same colour as the backdrop would be replaced along with it.

## Cell order

Directions sheet. Left and right are as the viewer sees them.

| | Column 1 | Column 2 | Column 3 |
| --- | --- | --- | --- |
| Row 1 | up and left | up | up and right |
| Row 2 | left | straight at the viewer | right |
| Row 3 | down and left | down | down and right |

Reactions sheet. He faces the viewer in all of them.

| | Column 1 | Column 2 | Column 3 |
| --- | --- | --- | --- |
| Row 1 | content smile, eyes closed | calm, eyes open (spare) | surprised |
| Row 2 | laughing | thumbs up with a wink | thinking, hand on chin |
| Row 3 | reading an open book | asleep, cheek on hand | waving |

## The prompts used for the current sheets

These were written against the first sheets, which had a black high-collar jacket. Change the last paragraph of each to describe what you want next.

### Prompt 1: directions sheet

```text
Redraw the attached character sheet. Keep it exactly as it is in layout and
style: one square image, a 3 × 3 grid of equal cells with no gaps, borders or
text, the same person with the same face, hair, beard and skin tone, the same
head-and-shoulders framing with the head the same size and centred in every
cell, and the same flat dark navy backdrop (#1E334C) with no gradient or
texture.

Keep the direction he looks in each cell: row 1 up-left, up, up-right; row 2
left, straight at the viewer, right; row 3 down-left, down, down-right.

Change two things. First, his expression: in every cell he looks relaxed and
approachable, with a slight closed-mouth smile, soft eyes and brows at rest.
Keep his chin level; in the top row he glances up with a small tilt of the
head rather than raising his chin. Second, his clothes: replace the black
high-collar jacket with a plain cream crew-neck t-shirt under an open warm-grey
hoodie. Do not use blue, teal or purple anywhere in the clothes.
```

### Prompt 2: reactions sheet

```text
Redraw the second attached character sheet so it matches the first attached
sheet: the same person, drawing style, clothes (cream crew-neck t-shirt under
an open warm-grey hoodie) and flat dark navy backdrop (#1E334C).

Keep the layout exactly: one square image, a 3 × 3 grid of equal cells with no
gaps, borders or text, head and shoulders, the head the same size as in the
first sheet, facing the viewer.

Keep each cell's reaction: row 1 a content smile with eyes closed, a calm face
with eyes open and a slight smile, surprised; row 2 laughing, a thumbs up with
a wink, thinking with a hand on the chin; row 3 reading an open book, asleep
with his cheek resting on his hand, waving with an open hand.

Make every reaction warm and friendly. Do not use blue, teal or purple
anywhere in the clothes or the book.
```
