-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2024 at 08:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_toko_buku`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `published` datetime DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `user`, `category`, `author`, `image`, `published`, `price`, `stock`, `createdAt`, `updatedAt`) VALUES
(1, 'Atomic Habits', 1, 1, 'James Clear', '/uploads/image 1.png', '2024-10-09 01:51:39', 100000, 11, '2024-10-09 01:51:39', '2024-10-09 01:51:39'),
(2, 'The 7 Habits of Highly Effective People', 1, 1, 'Stephen R. Covey', '/uploads/image 2.png', '2024-10-09 01:51:39', 100000, 3, '2024-10-09 01:51:39', '2024-10-09 01:51:39'),
(3, 'Bussiness is the key', 1, 2, 'John Doe', '/uploads/image 3.png', '2024-10-09 01:51:39', 100000, 3, '2024-10-09 01:51:39', '2024-10-09 01:51:39');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `user`, `createdAt`, `updatedAt`) VALUES
(1, 'Sefl Improvement', 6, '2024-10-09 01:51:39', '2024-10-09 01:51:39'),
(2, 'Business and Economics', 6, '2024-10-09 01:51:39', '2024-10-09 01:51:39'),
(3, 'Politics', 6, '2024-10-09 01:51:39', '2024-10-09 01:51:39');

-- --------------------------------------------------------

--
-- Table structure for table `detailtransactions`
--

CREATE TABLE `detailtransactions` (
  `id` int(11) NOT NULL,
  `transaction` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `book` int(11) DEFAULT NULL,
  `titleBook` varchar(255) DEFAULT NULL,
  `imageBook` varchar(255) DEFAULT NULL,
  `priceBook` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detailtransactions`
--

INSERT INTO `detailtransactions` (`id`, `transaction`, `user`, `book`, `titleBook`, `imageBook`, `priceBook`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 3, 'Bussiness is the key', '/uploads/image 3.png', 100000, 10, '2024-10-09 01:56:03', '2024-10-09 01:56:03'),
(2, 2, 1, 2, 'The 7 Habits of Highly Effective People', '/uploads/image 2.png', 100000, 10, '2024-10-09 01:56:03', '2024-10-09 01:56:03'),
(3, 3, 1, 1, 'Atomic Habits', '/uploads/image 1.png', 100000, 2, '2024-10-09 02:02:10', '2024-10-09 02:02:10');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240916151952-create-user.js'),
('20240916152503-create-category.js'),
('20240916152752-create-book.js'),
('20240916153041-create-transaction.js'),
('20240916153436-create-detail-transaction.js');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `invoice`, `user`, `date`, `createdAt`, `updatedAt`) VALUES
(1, 'T-471215', 1, '2024-10-09 01:54:49', '2024-10-09 01:54:49', '2024-10-09 01:54:49'),
(2, 'T-182350', 1, '2024-10-09 01:56:03', '2024-10-09 01:56:03', '2024-10-09 01:56:03'),
(3, 'T-381269', 1, '2024-10-09 02:02:10', '2024-10-09 02:02:10', '2024-10-09 02:02:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` enum('admin','kasir') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', '$2a$10$5cfKlq5eDnh6PDhqh/TVrOXCf2AdcTHM3qgpPOlqbviibFP1FLvay', 'admin@gmail.com', NULL, '2024-10-09 01:51:39', '2024-10-09 01:51:39'),
(2, 'Ali', '$2a$10$5cfKlq5eDnh6PDhqh/TVrOXCf2AdcTHM3qgpPOlqbviibFP1FLvay', 'ali@gmail.com', NULL, '2024-10-09 01:51:39', '2024-10-09 01:51:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detailtransactions`
--
ALTER TABLE `detailtransactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detailtransactions`
--
ALTER TABLE `detailtransactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
