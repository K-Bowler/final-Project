INSERT INTO "users" ("userName", "password", "email")
  VALUES
    ('Coolguy55', 'coolpassword1234', 'coolguy@gmail.com'),
    ('Test1', 'coolpassword1234', 'test1@gmail.com'),
    ('Test2', 'coolpassword1234', 'test2@gmail.com'),
    ('Test3', 'coolpassword1234', 'test3@gmail.com'),
    ('Test4', 'coolpassword1234', 'test4@gmail.com'),
    ('Test5', 'coolpassword1234', 'test5@gmail.com'),
    ('Test6', 'coolpassword1234', 'test6@gmail.com');

INSERT INTO "entries" ("entryUrl", "userId")
  VALUES 
    ('/images/live-reaction.png', 1),
    ('/images/oh-fr.webp', 1),
    ('/images/spongboq.webp', 1),
    ('/images/the-rock.jpg', 1);

INSERT INTO "likesDislikes" ("isLiked", "isDisliked", "userId", "entryId")
  VALUES
    (true, false, 2, 1),
    (true, false, 3, 1),
    (true, false, 4, 1),
    (true, false, 5, 1),
    (true, false, 6, 1),
    (false, true, 2, 2),
    (false, true, 3, 2),
    (false, true, 4, 2),
    (false, true, 5, 2),
    (false, true, 6, 2);
