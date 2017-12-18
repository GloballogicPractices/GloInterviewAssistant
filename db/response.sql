-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 03, 2017 at 10:24 AM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.1.11-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hakathon`
--

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `position_applied_for` varchar(255) NOT NULL,
  `work_experience` varchar(255) NOT NULL,
  `current_ctc` varchar(255) NOT NULL,
  `expected_ctc` varchar(255) NOT NULL,
  `notice_period` varchar(255) NOT NULL COMMENT 'in days',
  `negotiable` varchar(50) NOT NULL,
  `already_serving` varchar(100) NOT NULL,
  `any_offer_in_hand` varchar(100) NOT NULL,
  `reason_for_change` text NOT NULL,
  `current_job_duration` varchar(255) NOT NULL,
  `prefered_time_to_contact` varchar(255) NOT NULL,
  `prefered_location` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `response`
--

INSERT INTO `response` (`id`, `name`, `email`, `mobile_number`, `position_applied_for`, `work_experience`, `current_ctc`, `expected_ctc`, `notice_period`, `negotiable`, `already_serving`, `any_offer_in_hand`, `reason_for_change`, `current_job_duration`, `prefered_time_to_contact`, `prefered_location`, `domain`) VALUES
(1, 'Dharmendra Singh', '', '', 'Devops', '12', '1300000', '2600000', '60', '1', '0', '1', 'better apportunity', '9 years 6 months', 'post lunch 3 to 5 pm', 'NCR', 'CMS, CRM '),
(2, 'Anita', '', '', 'UI', '6', '800000', '1600000', '90', '1', '0', '0', 'better apportunity', '1 year 6 months', 'first half 10:00 AM to 12:00 PM', 'Bangalore', 'UI/UX');

-- --------------------------------------------------------

--
-- Table structure for table `unresolved_queries`
--

CREATE TABLE `unresolved_queries` (
  `id` int(11) NOT NULL,
  `query_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unresolved_queries`
--
ALTER TABLE `unresolved_queries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `unresolved_queries`
--
ALTER TABLE `unresolved_queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
