-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 17, 2019 at 10:54 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `public_record`
--

-- --------------------------------------------------------

--
-- Table structure for table `emailData`
--

CREATE TABLE `emailData` (
  `id` int(11) NOT NULL,
  `emailData_firstname` varchar(50) NOT NULL,
  `emailData_lastname` varchar(50) NOT NULL,
  `emailData_fullname` varchar(150) NOT NULL,
  `emailData_location` varchar(200) NOT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `data_id` varchar(50) NOT NULL,
  `db` varchar(50) NOT NULL,
  `state` varchar(10) NOT NULL,
  `state_name` varchar(50) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `dob` varchar(50) NOT NULL,
  `race` varchar(100) NOT NULL,
  `eyes` varchar(100) NOT NULL,
  `hair` varchar(100) NOT NULL,
  `height` varchar(100) NOT NULL,
  `weight` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL,
  `sex` varchar(20) NOT NULL,
  `country` varchar(50) NOT NULL,
  `address` varchar(300) NOT NULL,
  `crime_type` varchar(500) NOT NULL,
  `sentence` varchar(500) NOT NULL,
  `type` varchar(200) NOT NULL,
  `personal_sign` varchar(500) NOT NULL,
  `last_update` varchar(100) NOT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `phoneData`
--

CREATE TABLE `phoneData` (
  `id` int(11) NOT NULL,
  `phoneData_address` varchar(250) NOT NULL,
  `phoneData_profile` varchar(500) NOT NULL,
  `phoneData_cnam` varchar(150) NOT NULL,
  `phoneData_firstname` varchar(50) NOT NULL,
  `phoneData_lastname` varchar(50) NOT NULL,
  `phoneData_middlename` varchar(50) NOT NULL,
  `phoneData_gender` varchar(10) NOT NULL,
  `phoneData_image` varchar(500) NOT NULL,
  `phoneData_linetype` varchar(20) NOT NULL,
  `phoneData_city` varchar(30) NOT NULL,
  `phoneData_country` varchar(30) NOT NULL,
  `phoneData_state` varchar(30) NOT NULL,
  `phoneData_zip` int(11) NOT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_email`
--

CREATE TABLE `raw_json_email` (
  `id` int(11) NOT NULL,
  `email_data_json` mediumtext NOT NULL,
  `data_source` varchar(50) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_name`
--

CREATE TABLE `raw_json_name` (
  `id` int(11) NOT NULL,
  `person_data_json` mediumtext NOT NULL,
  `data_source` varchar(50) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_phone`
--

CREATE TABLE `raw_json_phone` (
  `id` int(11) NOT NULL,
  `phone_data_json` mediumtext NOT NULL,
  `data_source` varchar(50) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `searched_person`
--

CREATE TABLE `searched_person` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emailData`
--
ALTER TABLE `emailData`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `phoneData`
--
ALTER TABLE `phoneData`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_email`
--
ALTER TABLE `raw_json_email`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_name`
--
ALTER TABLE `raw_json_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_phone`
--
ALTER TABLE `raw_json_phone`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `searched_person`
--
ALTER TABLE `searched_person`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emailData`
--
ALTER TABLE `emailData`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phoneData`
--
ALTER TABLE `phoneData`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `raw_json_email`
--
ALTER TABLE `raw_json_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `raw_json_name`
--
ALTER TABLE `raw_json_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `raw_json_phone`
--
ALTER TABLE `raw_json_phone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `searched_person`
--
ALTER TABLE `searched_person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
