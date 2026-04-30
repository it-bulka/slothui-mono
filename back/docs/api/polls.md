# Polls API

> Base path: `/api/polls` | All endpoints require **Bearer JWT**.

Polls are created as part of posts or messages — there is no standalone poll creation endpoint. Use the `poll` field in `POST /posts` or `POST /chats/:chatId/messages`.

---

## POST /polls/:pollId/choose-answer

Vote on a poll.

**Path params:** `pollId` — poll UUID

**Request body:**
```json
{ "answerIds": ["uuid-answer-1"] }
```

For `multiple: true` polls, pass multiple answer IDs:
```json
{ "answerIds": ["uuid-answer-1", "uuid-answer-3"] }
```

**Response 200:** Updated `PollResultDto` with new vote counts

---

## GET /polls/:pollId/details

Get full poll details including vote distribution and user's own vote.

**Path params:** `pollId` — poll UUID

**Response 200:** `PollResultDto`

---

## GET /polls/:pollId/answers/:answerId/voters?cursor=&limit=

Get a paginated list of users who voted for a specific answer.

For anonymous polls, voter identities are hidden.

**Path params:** `pollId`, `answerId`  
**Query params:** `cursor`, `limit` (default: 20)

**Response 200:**
```json
{
  "items": [{ "id": "uuid", "username": "john_doe", "nickname": "John Doe", "avatarUrl": null }],
  "nextCursor": "eyJpZCI6IjEyMyJ9",
  "hasMore": false
}
```

---

## CreatePollDto shape

Used when creating polls inside posts or messages:

```json
{
  "question": "What is your favourite framework?",
  "answers": [
    { "value": "React" },
    { "value": "Vue" },
    { "value": "Angular" }
  ],
  "multiple": false,
  "anonymous": false
}
```

---

## PollResultDto shape

```json
{
  "id": "uuid",
  "question": "What is your favourite framework?",
  "anonymous": false,
  "multiple": false,
  "parentType": "post",
  "parentId": "uuid-post",
  "answers": [
    {
      "id": "uuid-answer-1",
      "value": "React",
      "votes": 25,
      "percentage": 58.1,
      "voters": [{ "id": "uuid", "username": "john_doe", "nickname": "John Doe", "avatarUrl": null }]
    }
  ],
  "userVote": ["uuid-answer-1"],
  "votesCount": 43
}
```
