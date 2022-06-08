set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "userName" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "createdAt" timestamptz default now() NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "entries" (
    "entryId" serial NOT NULL,
    "entryUrl" TEXT NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamptz default now() NOT NULL,
    CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "likesDislikes" (
    "isLiked" BOOLEAN NOT NULL default false,
    "isDisliked" BOOLEAN NOT NULL default false,
    "userId" integer NOT NULL,
    "entryId" integer NOT NULL,
    CONSTRAINT "likesDislikes_pk" PRIMARY KEY ("userId","entryId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "comments" (
    "commentId" serial NOT NULL,
    "entryId" integer NOT NULL,
    "userId" integer NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" timestamptz default now() NOT NULL,
    CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likesDislikes" ADD CONSTRAINT "likesDislikes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likesDislikes" ADD CONSTRAINT "likesDislikes_fk1" FOREIGN KEY ("entryId") REFERENCES "entries"("entryId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("entryId") REFERENCES "entries"("entryId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
