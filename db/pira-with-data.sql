-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 23, 2019 at 08:54 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pira`
--

-- --------------------------------------------------------

--
-- Table structure for table `boards`
--

CREATE TABLE `boards` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `team` int(11) DEFAULT NULL,
  `lead` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `title`, `team`, `lead`, `created_at`) VALUES
(1, 'Star board', 1, 1, '2019-01-23 21:38:00'),
(2, 'Music Board', 2, 1, '2019-01-23 21:41:08'),
(3, '80s board', 3, 1, '2019-01-23 21:51:36');

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `assignee` int(11) DEFAULT NULL,
  `list` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cards`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `developers`
--

CREATE TABLE `developers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `developers`
--

INSERT INTO `developers` (`id`, `email`, `password`, `username`, `created_at`) VALUES
(1, 'georgi.bojinov@hotmail.com', '$2y$10$6EiMNuUjl6iMPukSQhJSe.6yH3SAobD/OFiTDN9v0a1FITZ3Sb9Zi', 'Georgi Bozhinov', '2019-01-23 21:31:39'),
(2, 'ymca@ymca.edu', '$2y$10$BhB6Tn0/rGGDeWjLWD1v6uquy8i0Fz9q8JWAaI5easfINuxsif7TK', 'YMCA', '2019-01-23 21:53:37');

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `board` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lists`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `created_at`) VALUES
(1, 'The Stars', '2019-01-23 21:36:52'),
(2, 'The Village People', '2019-01-23 21:37:16'),
(3, 'Florence and the Machines', '2019-01-23 21:37:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boards`
--
ALTER TABLE `boards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `developers`
--
ALTER TABLE `developers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boards`
--
ALTER TABLE `boards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `developers`
--
ALTER TABLE `developers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
