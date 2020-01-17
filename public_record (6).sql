-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 17, 2020 at 07:58 AM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `api_call_limit`
--

CREATE TABLE `api_call_limit` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `call_limit` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `birth_record`
--

CREATE TABLE `birth_record` (
  `id` int(11) NOT NULL,
  `birthRecord_firstName` varchar(500) DEFAULT NULL,
  `birthRecord_lastName` varchar(500) DEFAULT NULL,
  `birthRecord_middleName` varchar(500) DEFAULT NULL,
  `birthRecord_dob` varchar(200) DEFAULT NULL,
  `birthRecord_gender` varchar(100) DEFAULT NULL,
  `birthRecord_country` varchar(500) DEFAULT NULL,
  `birthRecord_state` varchar(500) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cell_data_address`
--

CREATE TABLE `cell_data_address` (
  `id` int(11) NOT NULL,
  `cell_fullStreet` varchar(500) DEFAULT NULL,
  `cell_city` varchar(500) DEFAULT NULL,
  `cell_state` varchar(500) DEFAULT NULL,
  `cell_zip` varchar(500) DEFAULT NULL,
  `cell_subdivisionName` varchar(5000) DEFAULT NULL,
  `cell_firstDate` varchar(200) DEFAULT NULL,
  `cell_lastDate` varchar(200) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cell_data_dob`
--

CREATE TABLE `cell_data_dob` (
  `id` int(11) NOT NULL,
  `cell_dob` varchar(500) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cell_data_email`
--

CREATE TABLE `cell_data_email` (
  `id` int(11) NOT NULL,
  `cell_email` varchar(500) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cell_data_name`
--

CREATE TABLE `cell_data_name` (
  `id` int(11) NOT NULL,
  `cell_firstName` varchar(500) DEFAULT NULL,
  `cell_lastName` varchar(500) DEFAULT NULL,
  `cell_middleName` varchar(500) DEFAULT NULL,
  `cellPhone` varchar(200) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `criminal_record`
--

CREATE TABLE `criminal_record` (
  `id` int(11) NOT NULL,
  `firstname` varchar(500) DEFAULT NULL,
  `lastname` varchar(500) DEFAULT NULL,
  `middlename` varchar(500) DEFAULT NULL,
  `generation` varchar(500) DEFAULT NULL,
  `dob` varchar(500) DEFAULT NULL,
  `birth_state` varchar(200) DEFAULT NULL,
  `age` varchar(200) DEFAULT NULL,
  `casenumber` varchar(200) DEFAULT NULL,
  `aka1` varchar(500) DEFAULT NULL,
  `aka2` varchar(500) DEFAULT NULL,
  `dobaka` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `address2` varchar(500) DEFAULT NULL,
  `city` varchar(500) DEFAULT NULL,
  `state` varchar(500) DEFAULT NULL,
  `zip` varchar(200) DEFAULT NULL,
  `haircolor` varchar(500) DEFAULT NULL,
  `eyecolor` varchar(500) DEFAULT NULL,
  `height` varchar(500) DEFAULT NULL,
  `weight` varchar(500) DEFAULT NULL,
  `race` varchar(500) DEFAULT NULL,
  `sex` varchar(100) DEFAULT NULL,
  `skintone` varchar(500) DEFAULT NULL,
  `scarsmarks` varchar(1000) DEFAULT NULL,
  `military_service` varchar(1000) DEFAULT NULL,
  `charge_category` varchar(1000) DEFAULT NULL,
  `charges_filed_date` varchar(1000) DEFAULT NULL,
  `offense_date` varchar(500) DEFAULT NULL,
  `offense_code` varchar(1000) DEFAULT NULL,
  `offensedescription1` varchar(1000) DEFAULT NULL,
  `offensedescription2` varchar(1000) DEFAULT NULL,
  `ncic_code` varchar(500) DEFAULT NULL,
  `counts` varchar(500) DEFAULT NULL,
  `plea` varchar(500) DEFAULT NULL,
  `conviction_date` varchar(500) DEFAULT NULL,
  `conviction_place` varchar(500) DEFAULT NULL,
  `court` varchar(1000) DEFAULT NULL,
  `source` varchar(1000) DEFAULT NULL,
  `sentenceyyymmddd` varchar(200) DEFAULT NULL,
  `probationyyymmddd` varchar(200) DEFAULT NULL,
  `disposition` varchar(1000) DEFAULT NULL,
  `crb` varchar(200) DEFAULT NULL,
  `dispositiondate` varchar(500) DEFAULT NULL,
  `court_costs` varchar(200) DEFAULT NULL,
  `arresting_agency` varchar(1000) DEFAULT NULL,
  `case_type` varchar(1000) DEFAULT NULL,
  `fines` varchar(200) DEFAULT NULL,
  `source_name` varchar(500) DEFAULT NULL,
  `source_state` varchar(500) DEFAULT NULL,
  `mugshot` varchar(500) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_record`
--

CREATE TABLE `customer_record` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `searched_person_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `death_record`
--

CREATE TABLE `death_record` (
  `id` int(11) NOT NULL,
  `firstname` varchar(500) DEFAULT NULL,
  `lastname` varchar(500) DEFAULT NULL,
  `middlename` varchar(500) DEFAULT NULL,
  `DateofDeath` varchar(200) DEFAULT NULL,
  `DateofBirth` varchar(200) DEFAULT NULL,
  `lastcounty` varchar(500) DEFAULT NULL,
  `State` varchar(200) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `email_data`
--

CREATE TABLE `email_data` (
  `id` int(11) NOT NULL,
  `emailData_firstname` varchar(500) DEFAULT NULL,
  `emailData_lastname` varchar(500) DEFAULT NULL,
  `emailData_fullname` varchar(150) DEFAULT NULL,
  `emailData_location` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `md_record`
--

CREATE TABLE `md_record` (
  `id` int(11) NOT NULL,
  `md_firstname` varchar(500) DEFAULT NULL,
  `md_lastname` varchar(500) DEFAULT NULL,
  `md_middlename` varchar(500) DEFAULT NULL,
  `spouse_firstname` varchar(500) DEFAULT NULL,
  `spouse_lastname` varchar(500) DEFAULT NULL,
  `spouse_middlename` varchar(500) DEFAULT NULL,
  `marriage_county` varchar(500) DEFAULT NULL,
  `marriage_state` varchar(200) DEFAULT NULL,
  `marriage_date` varchar(200) DEFAULT NULL,
  `divorce_county` varchar(500) DEFAULT NULL,
  `divorce_state` varchar(200) DEFAULT NULL,
  `divorce_date` varchar(500) DEFAULT NULL,
  `certificate_number` varchar(500) DEFAULT NULL,
  `volume_number` varchar(500) DEFAULT NULL,
  `decreetype` varchar(500) DEFAULT NULL,
  `docketnumber` varchar(500) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `firstName` varchar(500) DEFAULT NULL,
  `lastName` varchar(500) DEFAULT NULL,
  `middleName` varchar(500) DEFAULT NULL,
  `dob` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `state` varchar(200) DEFAULT NULL,
  `zip` varchar(500) DEFAULT NULL,
  `county` varchar(500) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `phone_data`
--

CREATE TABLE `phone_data` (
  `id` int(11) NOT NULL,
  `phone_firstname` varchar(500) DEFAULT NULL,
  `phone_lastname` varchar(500) DEFAULT NULL,
  `phone_middlename` varchar(500) DEFAULT NULL,
  `phone_dob` varchar(500) DEFAULT NULL,
  `phone_address` varchar(500) DEFAULT NULL,
  `phone_city` varchar(500) DEFAULT NULL,
  `phone_state` varchar(500) DEFAULT NULL,
  `phone_zip` varchar(200) DEFAULT NULL,
  `phone_county` varchar(500) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `searched_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_birth`
--

CREATE TABLE `raw_json_birth` (
  `id` int(11) NOT NULL,
  `birth_data_json` mediumtext NOT NULL,
  `data_source` varchar(500) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_cell`
--

CREATE TABLE `raw_json_cell` (
  `id` int(11) NOT NULL,
  `cell_data_json` longtext NOT NULL,
  `data_source` varchar(500) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_criminalchecks`
--

CREATE TABLE `raw_json_criminalchecks` (
  `id` int(11) NOT NULL,
  `criminal_data_json` longtext NOT NULL,
  `data_source` varchar(500) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_death`
--

CREATE TABLE `raw_json_death` (
  `id` int(11) NOT NULL,
  `death_data_json` mediumtext NOT NULL,
  `data_source` varchar(500) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_email`
--

CREATE TABLE `raw_json_email` (
  `id` int(11) NOT NULL,
  `email_data_json` mediumtext NOT NULL,
  `data_source` varchar(500) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_json_md`
--

CREATE TABLE `raw_json_md` (
  `id` int(11) NOT NULL,
  `md_data_json` mediumtext NOT NULL,
  `data_source` varchar(500) NOT NULL,
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
  `data_source` varchar(500) NOT NULL,
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
  `data_source` varchar(500) NOT NULL,
  `searched_person_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `searched_person`
--

CREATE TABLE `searched_person` (
  `id` int(11) NOT NULL,
  `first_name` varchar(500) DEFAULT NULL,
  `last_name` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_call_limit`
--
ALTER TABLE `api_call_limit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `birth_record`
--
ALTER TABLE `birth_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cell_data_address`
--
ALTER TABLE `cell_data_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cell_data_dob`
--
ALTER TABLE `cell_data_dob`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cell_data_email`
--
ALTER TABLE `cell_data_email`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cell_data_name`
--
ALTER TABLE `cell_data_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `criminal_record`
--
ALTER TABLE `criminal_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_record`
--
ALTER TABLE `customer_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `death_record`
--
ALTER TABLE `death_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_data`
--
ALTER TABLE `email_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `md_record`
--
ALTER TABLE `md_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `phone_data`
--
ALTER TABLE `phone_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_birth`
--
ALTER TABLE `raw_json_birth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_cell`
--
ALTER TABLE `raw_json_cell`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_criminalchecks`
--
ALTER TABLE `raw_json_criminalchecks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_death`
--
ALTER TABLE `raw_json_death`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_email`
--
ALTER TABLE `raw_json_email`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_json_md`
--
ALTER TABLE `raw_json_md`
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
-- AUTO_INCREMENT for table `api_call_limit`
--
ALTER TABLE `api_call_limit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `birth_record`
--
ALTER TABLE `birth_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `cell_data_address`
--
ALTER TABLE `cell_data_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;
--
-- AUTO_INCREMENT for table `cell_data_dob`
--
ALTER TABLE `cell_data_dob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `cell_data_email`
--
ALTER TABLE `cell_data_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `cell_data_name`
--
ALTER TABLE `cell_data_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
--
-- AUTO_INCREMENT for table `criminal_record`
--
ALTER TABLE `criminal_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;
--
-- AUTO_INCREMENT for table `customer_record`
--
ALTER TABLE `customer_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `death_record`
--
ALTER TABLE `death_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `email_data`
--
ALTER TABLE `email_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `md_record`
--
ALTER TABLE `md_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=450;
--
-- AUTO_INCREMENT for table `phone_data`
--
ALTER TABLE `phone_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `raw_json_birth`
--
ALTER TABLE `raw_json_birth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `raw_json_cell`
--
ALTER TABLE `raw_json_cell`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `raw_json_criminalchecks`
--
ALTER TABLE `raw_json_criminalchecks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `raw_json_death`
--
ALTER TABLE `raw_json_death`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `raw_json_email`
--
ALTER TABLE `raw_json_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `raw_json_md`
--
ALTER TABLE `raw_json_md`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `raw_json_name`
--
ALTER TABLE `raw_json_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `raw_json_phone`
--
ALTER TABLE `raw_json_phone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `searched_person`
--
ALTER TABLE `searched_person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
