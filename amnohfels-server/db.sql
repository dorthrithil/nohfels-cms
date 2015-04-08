-- phpMyAdmin SQL Dump
-- version 4.2.12
-- http://www.phpmyadmin.net
--
-- Host: rdbms
-- Erstellungszeit: 06. Apr 2015 um 20:46
-- Server Version: 5.5.42-log
-- PHP-Version: 5.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `DB2089315`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contact_modules`
--

CREATE TABLE IF NOT EXISTS `contact_modules` (
`id` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `contact_modules`
--

INSERT INTO `contact_modules` (`id`, `topic`, `title`) VALUES
(1, 'Café', 'Haben Sie Fragen?');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `image_modules`
--

CREATE TABLE IF NOT EXISTS `image_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `image_modules`
--

INSERT INTO `image_modules` (`id`, `title`) VALUES
(1, 'Bildergallerie');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `image_module_images`
--

CREATE TABLE IF NOT EXISTS `image_module_images` (
`id` int(11) NOT NULL,
  `image_module` int(11) NOT NULL,
  `image_size` varchar(255) NOT NULL,
  `image_thumb_src` varchar(255) NOT NULL,
  `image_src` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `image_module_images`
--

INSERT INTO `image_module_images` (`id`, `image_module`, `image_size`, `image_thumb_src`, `image_src`) VALUES
(1, 1, 'large', 'images/gallery/cafe/1.jpg', 'images/gallery/cafe/1.jpg'),
(2, 1, 'small', 'images/gallery/cafe/2.jpg', 'images/gallery/cafe/2.jpg'),
(3, 1, 'small', 'images/gallery/cafe/3.jpg', 'images/gallery/cafe/3.jpg'),
(4, 1, 'small', 'images/gallery/cafe/4.jpg', 'images/gallery/cafe/4.jpg'),
(5, 1, 'small', 'images/gallery/cafe/5.jpg', 'images/gallery/cafe/5.jpg'),
(6, 1, 'small', 'images/gallery/cafe/6.jpg', 'images/gallery/cafe/6.jpg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `image_module_image_sizes`
--

CREATE TABLE IF NOT EXISTS `image_module_image_sizes` (
  `size` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `image_module_image_sizes`
--

INSERT INTO `image_module_image_sizes` (`size`) VALUES
('large'),
('small');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `instagram_modules`
--

INSERT INTO `instagram_modules` (`id`, `max_photos`, `filter_out_tags`, `filter_for_tags`, `title`) VALUES
(1, 10, 1, 1, 'Aktuelle Bilder von Instagram');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `instagram_module_tags`
--

CREATE TABLE IF NOT EXISTS `instagram_module_tags` (
`id` int(11) NOT NULL,
  `instagram_module` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `instagram_module_tags`
--

INSERT INTO `instagram_module_tags` (`id`, `instagram_module`, `tag`) VALUES
(1, 1, 'cafe'),
(2, 1, 'café');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `module_types`
--

CREATE TABLE IF NOT EXISTS `module_types` (
  `type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `module_types`
--

INSERT INTO `module_types` (`type`, `name`) VALUES
('contact_module', 'Kontaktformular'),
('image_module', 'Bildergallerie'),
('instagram_module', 'Instagram'),
('parallax_module', 'Parallax'),
('staff_module', 'Personal'),
('text_module', 'Text');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
`id` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `module_type` varchar(255) NOT NULL,
  `module_id` int(11) NOT NULL,
  `y_index` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `pages`
--

INSERT INTO `pages` (`id`, `topic`, `module_type`, `module_id`, `y_index`) VALUES
(1, 'cafe', 'parallax_module', 1, 0),
(2, 'cafe', 'text_module', 1, 1),
(3, 'cafe', 'image_module', 1, 2),
(4, 'cafe', 'parallax_module', 2, 3),
(5, 'cafe', 'staff_module', 1, 4),
(6, 'cafe', 'contact_module', 1, 5),
(7, 'cafe', 'instagram_module', 1, 6);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `parallax_modules`
--

CREATE TABLE IF NOT EXISTS `parallax_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `caption` text NOT NULL,
  `height` varchar(255) NOT NULL,
  `bg_img_src` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `parallax_modules`
--

INSERT INTO `parallax_modules` (`id`, `title`, `caption`, `height`, `bg_img_src`) VALUES
(1, 'Sommercafé am Nohfels', 'Ein Stück Schweden in Bad Sobernheim', '100vh', 'images/parallax/cafe.jpg'),
(2, 'Öffnungszeiten', 'Mo-Fr: 13:00-19:00 Uhr<br /> Sa+So: 12:00-19:00 Uhr', '500px', 'images/parallax/kuchen.jpg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `staff_modules`
--

CREATE TABLE IF NOT EXISTS `staff_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `staff_modules`
--

INSERT INTO `staff_modules` (`id`, `title`) VALUES
(1, 'Unser Team');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `staff_module_images`
--

CREATE TABLE IF NOT EXISTS `staff_module_images` (
  `image_src` varchar(255) NOT NULL,
  `caption` text NOT NULL,
  `staff_module` int(11) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `staff_module_images`
--

INSERT INTO `staff_module_images` (`image_src`, `caption`, `staff_module`, `position`) VALUES
('images/staff/uwe.jpg', 'Uwe Engelmann', 1, 0),
('images/staff/lukas.jpg', 'Lukas Engelmann', 1, 1),
('images/staff/marina.jpg', 'Marina Weidemaier', 1, 2),
('images/staff/eva.jpg', 'Eva Becker', 1, 3),
('images/staff/veronika.jpg', 'Veronika Scheffold', 1, 4),
('images/staff/lisa.jpg', 'Lisa Bachmann', 1, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `text_modules`
--

CREATE TABLE IF NOT EXISTS `text_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `text_modules`
--

INSERT INTO `text_modules` (`id`, `title`, `content`) VALUES
(1, 'Unser Angebot', 'Kaffee, Kuchen und Waffeln nach Hausfrauenart, Eisbecher, eine große Auswahl alkoholfreier Getränke, Wein von heimischen Winzern, Kirner Bier und vieles mehr.');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `topics`
--

CREATE TABLE IF NOT EXISTS `topics` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `topics`
--

INSERT INTO `topics` (`name`) VALUES
('cafe'),
('contact'),
('imprint'),
('minigolf'),
('nachtigallental'),
('psgh'),
('reisemobilstellplatz');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `contact_modules`
--
ALTER TABLE `contact_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `image_modules`
--
ALTER TABLE `image_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `image_module_images`
--
ALTER TABLE `image_module_images`
 ADD PRIMARY KEY (`id`), ADD KEY `image_module` (`image_module`), ADD KEY `image_size` (`image_size`);

--
-- Indizes für die Tabelle `image_module_image_sizes`
--
ALTER TABLE `image_module_image_sizes`
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
 ADD PRIMARY KEY (`type`);

--
-- Indizes für die Tabelle `pages`
--
ALTER TABLE `pages`
 ADD PRIMARY KEY (`id`), ADD KEY `topic` (`topic`), ADD KEY `module_type` (`module_type`);

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
-- Indizes für die Tabelle `staff_module_images`
--
ALTER TABLE `staff_module_images`
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
 ADD PRIMARY KEY (`name`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `contact_modules`
--
ALTER TABLE `contact_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `image_modules`
--
ALTER TABLE `image_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `image_module_images`
--
ALTER TABLE `image_module_images`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `instagram_modules`
--
ALTER TABLE `instagram_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `instagram_module_tags`
--
ALTER TABLE `instagram_module_tags`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `pages`
--
ALTER TABLE `pages`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `parallax_modules`
--
ALTER TABLE `parallax_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `staff_modules`
--
ALTER TABLE `staff_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `text_modules`
--
ALTER TABLE `text_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `image_module_images`
--
ALTER TABLE `image_module_images`
ADD CONSTRAINT `image_module_images_ibfk_1` FOREIGN KEY (`image_module`) REFERENCES `image_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `image_module_images_ibfk_2` FOREIGN KEY (`image_size`) REFERENCES `image_module_image_sizes` (`size`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `instagram_module_tags`
--
ALTER TABLE `instagram_module_tags`
ADD CONSTRAINT `instagram_module_tags_ibfk_1` FOREIGN KEY (`instagram_module`) REFERENCES `instagram_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `pages`
--
ALTER TABLE `pages`
ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`topic`) REFERENCES `topics` (`name`) ON UPDATE CASCADE,
ADD CONSTRAINT `pages_ibfk_2` FOREIGN KEY (`module_type`) REFERENCES `module_types` (`type`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `staff_module_images`
--
ALTER TABLE `staff_module_images`
ADD CONSTRAINT `staff_module_images_ibfk_1` FOREIGN KEY (`staff_module`) REFERENCES `staff_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
