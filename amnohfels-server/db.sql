-- phpMyAdmin SQL Dump
-- version 4.2.12
-- http://www.phpmyadmin.net
--
-- Host: rdbms
-- Erstellungszeit: 14. Jul 2015 um 13:42
-- Server Version: 5.5.44-log
-- PHP-Version: 5.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `DB2131029`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contact_modules`
--

CREATE TABLE IF NOT EXISTS `contact_modules` (
`id` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gallery_modules`
--

CREATE TABLE IF NOT EXISTS `gallery_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gallery_module_images`
--

CREATE TABLE IF NOT EXISTS `gallery_module_images` (
`id` int(11) NOT NULL,
  `gallery_module` int(11) NOT NULL,
  `image_size` varchar(255) NOT NULL,
  `image_thumb_src` varchar(255) NOT NULL,
  `image_src` varchar(255) NOT NULL,
  `image_position` int(11) NOT NULL,
  `image_thumb_square_src` varchar(255) NOT NULL,
  `image_caption` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gallery_module_image_sizes`
--

CREATE TABLE IF NOT EXISTS `gallery_module_image_sizes` (
  `size` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `instagram_modules`
--

CREATE TABLE IF NOT EXISTS `instagram_modules` (
`id` int(11) NOT NULL,
  `max_photos` int(11) NOT NULL DEFAULT '10',
  `filter_out_tags` tinyint(1) NOT NULL DEFAULT '1',
  `filter_for_tags` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `instagram_module_tags`
--

CREATE TABLE IF NOT EXISTS `instagram_module_tags` (
`id` int(11) NOT NULL,
  `instagram_module` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `module_types`
--

CREATE TABLE IF NOT EXISTS `module_types` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
`id` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `module_type_id` varchar(255) NOT NULL,
  `module_id` int(11) NOT NULL,
  `y_index` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `parallax_modules`
--

CREATE TABLE IF NOT EXISTS `parallax_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `caption` text NOT NULL,
  `height_num` int(5) NOT NULL,
  `height_unit` varchar(2) NOT NULL,
  `bg_img_src` varchar(255) NOT NULL,
  `bg_img_thumb_src` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `staff_modules`
--

CREATE TABLE IF NOT EXISTS `staff_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `staff_module_employees`
--

CREATE TABLE IF NOT EXISTS `staff_module_employees` (
  `image_src` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `staff_module` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `caption` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `text_modules`
--

CREATE TABLE IF NOT EXISTS `text_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `topics`
--

CREATE TABLE IF NOT EXISTS `topics` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` int(11) NOT NULL,
  `section` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `email` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `password` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `contact_modules`
--
ALTER TABLE `contact_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `gallery_modules`
--
ALTER TABLE `gallery_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `gallery_module_images`
--
ALTER TABLE `gallery_module_images`
 ADD PRIMARY KEY (`id`), ADD KEY `gallery_module` (`gallery_module`), ADD KEY `image_size` (`image_size`);

--
-- Indizes für die Tabelle `gallery_module_image_sizes`
--
ALTER TABLE `gallery_module_image_sizes`
 ADD PRIMARY KEY (`size`);

--
-- Indizes für die Tabelle `instagram_modules`
--
ALTER TABLE `instagram_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `instagram_module_tags`
--
ALTER TABLE `instagram_module_tags`
 ADD PRIMARY KEY (`id`), ADD KEY `instagram_module` (`instagram_module`);

--
-- Indizes für die Tabelle `module_types`
--
ALTER TABLE `module_types`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `pages`
--
ALTER TABLE `pages`
 ADD PRIMARY KEY (`id`), ADD KEY `topic` (`topic`), ADD KEY `module_type_id` (`module_type_id`);

--
-- Indizes für die Tabelle `parallax_modules`
--
ALTER TABLE `parallax_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `staff_modules`
--
ALTER TABLE `staff_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `staff_module_employees`
--
ALTER TABLE `staff_module_employees`
 ADD PRIMARY KEY (`staff_module`,`position`), ADD KEY `staff_module` (`staff_module`);

--
-- Indizes für die Tabelle `text_modules`
--
ALTER TABLE `text_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `topics`
--
ALTER TABLE `topics`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `contact_modules`
--
ALTER TABLE `contact_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT für Tabelle `gallery_modules`
--
ALTER TABLE `gallery_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `gallery_module_images`
--
ALTER TABLE `gallery_module_images`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=266;
--
-- AUTO_INCREMENT für Tabelle `instagram_modules`
--
ALTER TABLE `instagram_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `instagram_module_tags`
--
ALTER TABLE `instagram_module_tags`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT für Tabelle `pages`
--
ALTER TABLE `pages`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=201;
--
-- AUTO_INCREMENT für Tabelle `parallax_modules`
--
ALTER TABLE `parallax_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `staff_modules`
--
ALTER TABLE `staff_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `text_modules`
--
ALTER TABLE `text_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=128;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `gallery_module_images`
--
ALTER TABLE `gallery_module_images`
ADD CONSTRAINT `gallery_module_images_ibfk_1` FOREIGN KEY (`gallery_module`) REFERENCES `gallery_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `gallery_module_images_ibfk_2` FOREIGN KEY (`image_size`) REFERENCES `gallery_module_image_sizes` (`size`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `instagram_module_tags`
--
ALTER TABLE `instagram_module_tags`
ADD CONSTRAINT `instagram_module_tags_ibfk_1` FOREIGN KEY (`instagram_module`) REFERENCES `instagram_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `pages`
--
ALTER TABLE `pages`
ADD CONSTRAINT `pages_ibfk_2` FOREIGN KEY (`module_type_id`) REFERENCES `module_types` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `pages_ibfk_3` FOREIGN KEY (`topic`) REFERENCES `topics` (`id`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `staff_module_employees`
--
ALTER TABLE `staff_module_employees`
ADD CONSTRAINT `staff_module_employees_ibfk_1` FOREIGN KEY (`staff_module`) REFERENCES `staff_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
