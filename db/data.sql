-- devs

INSERT INTO `developers` (`id`, `email`, `password`, `username`, `created_at`) VALUES
(1, 'georgi.bojinov@hotmail.com', '$2y$10$6EiMNuUjl6iMPukSQhJSe.6yH3SAobD/OFiTDN9v0a1FITZ3Sb9Zi', 'Georgi Bozhinov', '2019-01-23 21:31:39'),
(2, 'ymca@ymca.edu', '$2y$10$BhB6Tn0/rGGDeWjLWD1v6uquy8i0Fz9q8JWAaI5easfINuxsif7TK', 'YMCA', '2019-01-23 21:53:37');

-- teams

INSERT INTO `teams` (`id`, `name`, `created_at`) VALUES
(1, 'The Stars', '2019-01-23 21:36:52'),
(2, 'The Village People', '2019-01-23 21:37:16'),
(3, 'Florence and the Machines', '2019-01-23 21:37:33');

-- boards

INSERT INTO `boards` (`id`, `title`, `team`, `lead`, `created_at`) VALUES
(1, 'Star board', 1, 1, '2019-01-23 21:38:00'),
(2, 'Music Board', 2, 1, '2019-01-23 21:41:08'),
(3, '80s board', 3, 1, '2019-01-23 21:51:36');

-- lists

INSERT INTO `lists` (`id`, `name`, `board`, `created_at`) VALUES
(1, 'Backlog', 1, '2019-01-23 21:38:09'),
(2, 'Todo', 1, '2019-01-23 21:38:19'),
(3, 'In Progress', 1, '2019-01-23 21:38:23'),
(4, 'Done', 1, '2019-01-23 21:38:27'),
(5, 'Blocked', 1, '2019-01-23 21:38:32'),
(6, 'In Progress', 2, '2019-01-23 21:41:15'),
(7, 'Done', 2, '2019-01-23 21:41:18'),
(8, 'Rocked', 2, '2019-01-23 21:41:21'),
(9, 'Rock', 3, '2019-01-23 21:51:43'),
(10, 'Metal', 3, '2019-01-23 21:51:45'),
(11, 'Chromium', 3, '2019-01-23 21:51:49'),
(12, 'Zync', 3, '2019-01-23 21:51:54');



-- cards

INSERT INTO `cards` (`id`, `title`, `description`, `assignee`, `list`, `created_at`) VALUES
(1, 'Do this and then do that', 'Pretty self-explanatory right? What could go wrong?', 1, 1, '2019-01-23 21:38:52'),
(2, 'Do that and then do this', 'Obviously, this is in progress.', 1, 3, '2019-01-23 21:39:19'),
(3, 'Come up with smarter names for cards', 'Well, this is a tough one.', 1, 2, '2019-01-23 21:39:33'),
(4, 'Make Web tech project awesome', 'Kinda hard to decide where this is. In progress or done?', 1, 3, '2019-01-23 21:40:04'),
(5, 'Make modals everywhere', 'This is for done, definitely.', 1, 4, '2019-01-23 21:40:21'),
(6, 'Come up with ideas for colours', 'Blocked. :(', 1, 5, '2019-01-23 21:40:38'),
(7, 'Make a good song', 'Right?', 1, 6, '2019-01-23 21:50:10'),
(8, 'Make an album', 'The logical next step.', 1, 6, '2019-01-23 21:50:23'),
(9, 'Be famous', 'DONE', 1, 7, '2019-01-23 21:50:36'),
(10, 'YMCA', 'It\'s fun to stay at the... Y-M-C-A', 1, 8, '2019-01-23 21:51:04');
