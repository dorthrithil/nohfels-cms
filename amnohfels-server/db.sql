-- phpMyAdmin SQL Dump
-- version 4.2.12
-- http://www.phpmyadmin.net
--
-- Host: rdbms
-- Erstellungszeit: 11. Apr 2016 um 16:20
-- Server Version: 5.5.48-log
-- PHP-Version: 5.5.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `DB2528943`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `blog_modules`
--

CREATE TABLE IF NOT EXISTS `blog_modules` (
`id` int(11) NOT NULL,
  `max_entries` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `blog_modules`
--

INSERT INTO `blog_modules` (`id`, `max_entries`, `title`) VALUES
(7, 4, 'Blog');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `blog_module_entries`
--

CREATE TABLE IF NOT EXISTS `blog_module_entries` (
`id` int(11) NOT NULL,
  `blog_module` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `text` text COLLATE latin1_german1_ci NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `blog_module_entries`
--

INSERT INTO `blog_module_entries` (`id`, `blog_module`, `title`, `text`, `datetime`) VALUES
(1, 7, 'Klassifikation von Gesichtsausdrücken anhand visueller Merkmale', '<p>In der Bachelorarbeit wird eine Software zur Erkennung von Gesichtsausdrücken anhand visueller Merkmale auf Einzelbildern konzipiert, implementiert und evaluiert.<br/>Es sollen die Gesichtsausdrücke Fröhlichkeit, Verärgerung, Traurigkeit, Ekel, Überraschung und Furcht sowie ein neutraler Gesichtsausdruck klassifiziert werden.<br/><br/>Der Umfang der Arbeit gliedert sich in folgende Hauptaufgaben:<br/>• Implementierung einer Methode zur automatischen Extraktion von Gesichtern aus Bildern und die darin enthaltenen interessante Regionen. Es soll eine bestehende Library von OpenCV auf Basis von Haar-like Features verwendet werden.<br/>• Konzipierung und Entwicklung einer Methode zur Merkmalsdetektion und -extraktion aus Regionen. Interessante Regionen sind Augenbrauen, Augen, Nase, Mund, Stirn und Wangen.<br/>• Implementierung einer Klassifikation von Gesichtsausdrücken anhand von Merkmalen. Dafür werden Gesichtsausdrücke in Action Units unterteilt, die Einheiten von Muskelbewegungen für verschiedene Regionen im Gesicht repräsentieren. Das Training und die Klassifikation wird durch eine Support Vector Machine (SVM) aus der bestehenden Library von OpenCV realisiert.<br/><br/>Die Programmierung wird in C++ im ROS Framework durchgeführt, sodass eine geeignete Schnittstelle für Lisa, den Serviceroboter der AGAS, vorliegt.</p>', '2016-03-10 10:25:00'),
(9, 7, 'Web Analytics auf Informationswebsites', '<p>Die weltweite Zuga?nglichkeit und umfangreiche Nutzung des Internets machen dieses Medium zu einem effizienten und beliebten Informations-, Kommunikations-, und Verkaufsinstrument. Immer mehr Menschen und Organisationen versuchen, diese Vorzu?ge durch eine eigene Website fu?r ihre Zwecke zu verwenden. Als hilfreiches Mittel zur Optimierung von Webpra?senzen bewa?hrte sich in den letzten Jahren der Einsatz von Web-Analytics-Software. Durch diese Software sind Websitebetreiber in der Lage, Informationen u?ber die Besucher ihrer Website und deren Nutzungsverhalten zu sammeln und zu messen. Das angestrebte Resultat sind Optimierungsentscheidungen auf Basis von Daten an Stelle von Annahmen und wirkungsvolle Testmo?glichkeiten. Fu?r den Bereich des E-Commerce existieren bis dato zahlreiche wissenschaftliche und praxiserprobte Hilfestellungen fu?r Web-Analytics-Projekte. Informationswebsites hingegen werden trotz ihrer Wichtigkeit nur vereinzelt thematisiert. Um diesem Defizit entgegenzuwirken, hat Hausmann 2012 das Framework for Web Analytics entwickelt, welches dem Anwender ein hilfreiches Referenzmodell fu?r sein Web Analytics-Vorhaben bietet. Diesen Ansatz weiter voranzutreiben ist das Ziel der Abschlussarbeit. Dazu wird mithilfe einer Literaturanalyse und einer Fallstudie das Framework validiert und erga?nzt, sowie weitere Handlungsempfehlungen identifiziert. Als Ergebnis werden die wichtigsten Erkenntnisse dieser Forschung zusammengefasst und fu?r den zuku?nftigen Gebrauch festgehalten.</p>', '2016-04-07 10:45:00'),
(10, 7, 'Why is this important', '<p>Goal of the thesis is to write a wrapper around the <b>Flickr API</b> to make it accessible through a <i>SPARQL</i> endpoint. The wrapper should support conjunctive and disjunctive queries over tags, location based queries based on geocoordinates, user based queries and possibly more. The wrapper will be integrated into a distributed, federated infrastructure for browsing media on the web. It uses semantic web technologies and integrated tada sources such as Wikipedia, Flickr, WordNet and GeoNames. The implementation should be configurable, such that it can easily be adapted to other web service APIs.</p><ul><li>Nice</li><li>Awesome</li><li>So good!</li></ul><p>The detection and tracking of moving objects is a necessity for collision-free navigation. However, tracking multiple objects is challenging, because in real-world scenarios neither the number of objects nor the identity of obtained measurements is known. <b>Therefore, state-estimation and data-association must be applied.</b><br/></p>', '2016-04-29 08:50:00'),
(11, 7, 'Tracking Multiple Objects Using the Probability Hypothesis Density Filter', '<p></p><p>Recently, we have proposed an efficient multi-object tracker based on a set-valued state estimator that provides instantaneous state estimation and delayed decision on data association. This tracker inferes the number of objects, their associated states (e.g., position and velocity), and trajectories. In this thesis, the proposed tracker will be applied to and evaluated in a<span class=""> </span><a href="http://www.cvlibs.net/datasets/kitti/eval_tracking.php">real-world scenario</a>. The target platform is equipped with mono/stereo cameras as well as a 3D laser range finder.</p><p><img src="http://www.duden.de/_media_/full/B/Bibliothek-201100279872.jpg" style="width: 50%;float: right;"/></p><p>Within the scope of this thesis, a<span class=""> </span><a href="http://www.ros.org/">ROS</a>-based system will be created that contains modules for reading the dataset, performing object detection and tracking, and visualization. Suitable object detectors must be implemented or adapted (reference detections in camera images exist).</p><p>Interested students should have profound programming skills (mainly C++, some Python) and preferably prior knowledge of ROS. Work will be carried out in Ubuntu Linux (this is a prerequisite enforced by ROS). Please contact<span class=""> </span><a href="mailto:nwojke@uni-koblenz.de">nwojke@uni-koblenz.de</a><span class=""> </span>if you are interested in this master thesis.</p>', '2016-04-16 02:50:00'),
(12, 7, 'E-Procurement und E-Learning', '<p></p><p>Das Virtual Company Dossier ist ein paket-basiertes Format, welches innerhalb eines elektronischen Ausschreibungsprozesses verwendet wird. Es ermöglicht die Erfassung von Evidenzen, die die notwendige Qualifikation eines Bewerbers, sowie die Erfüllung der mit dem Ausschreibungsverfahren verbundenen Kriterien, nachweisen.</p><p>Um die Anwendbarkeit des Verfahrens festzustellen, sollen zuerst die Ähnlichkeiten der beiden Formate herausgearbeitet werden. Diese sollen dann für die Identifizierung der abstrakten Anforderungen dienen, die mit den gleichen, durch das Format der Applikationsprofile bereitgestellten, Formalismen festgehalten werden können. Spezielle Anforderungen des VCDs sollen, soweit es geht, mit den bereitgestellten Mitteln erfasst werden. Wenn nötig, soll das Format, und das Tool zur Erstellung von Applikationsprofilen, angepasst werden, so dass die restlichen Anforderungen des VCDs beschrieben werden können.</p><p>Die daraus resultierenden Änderungen am Prozess der Testsystem-Erzeugung sollen ebenfalls eingearbeitet werden, so dass konkrete VCD-Pakete auf Korrektheit überprüft werden können.</p><p>Letztlich soll ein methodisches Vorgehen vorgeschlagen werden, mit dem paket-basierte Spezifikationen als Applikationsprofil erfasst werden können. Dieses soll auf einer Analyse der Änderungen basieren, die für die Erstellung des VCD Profils und entsprechender Testsysteme notwendig waren. Zudem sollen die Voraussetzungen für das Verfahren genannt werden, sowie eine umfangreiche Analyse bzgl. des Aufwandes erfolgen. Diese wird u.a. auf den Möglichkeiten zur Erfassung verschiedener Arten von Anforderungen sowie der Anpassbarkeit des Prozesses zur Generierung von Testsystemen basieren.  </p>', '2016-04-10 21:12:00'),
(14, 7, 'Ein interdisziplinarer Ansatz zum Conformance Testing', '<p></p><p>Standards haben längst Einzug in das Gebiet der Informatik erhalten und Teilgruppen verschiedener Organisationen beschäftigen sich mit der Beschließung von Normen für die standardisierte Lösung von Problemen in der Informatik. Ein wichtiger Teilaspekt ist die Spezifizierung von Datenformaten, die die Kompatibilität von Programmen sichern kann. Dabei existieren viele verschiedene Spezifizierungssprachen, die auf unterschiedliche Anforderungen ausgelegt sind und mit deren Hilfe valide Dokumente beschrieben werden können. Die Nutzung mehrerer Spezifikationssprachen ist durchaus sinnvoll, da die Mächtigkeit einer Sprache oftmals nicht ausreicht, um die Anforderungen zu erfassen.</p><p>So auch bei der von IMS entwickelten Spezifikation Common Cartridge. Das Common Cartridge Format beschreibt valide Zip-Pakete, die dazu genutzt werden können, verschiedene Lernobjekte zu aggregieren und als zusammenhängende Lerneinheit in eine Lernplattform zu importieren. Die Spezifikation benutzt bereits vorhandene und bewährte Spezifikationen, um Teile gültiger XML-Dokumente zu beschreiben. Zudem wird der Inhalt von Dateien mit der Paketstruktur in Verbindung gebracht, was u.a. die Überprüfung von Referenzen ermöglicht.</p><p>Das Common Cartridge Format wird durch ein sogenanntes Applikationsprofil erfasst. Ein solches erlaubt die Aggregation und Modifikation von Spezifikationen, sowie die Definition einer Verfahrensweise, die zum Testen von konkreten Paketen verwendet werden kann. Zudem kann ein Testsystem erstellt werden, welches diese Verfahrensweise nutzt, um die für ein Datenpaket notwendigen Tests zu bestimmen und auszuführen.</p><p>Somit stellt sich die Frage, ob sich ein generischer Ansatz finden lässt, der den Entwurf beliebiger Paketformate erlaubt. Von entscheidender Bedeutung ist dabei die Anpassbarkeit der unterstützenden Tools, die zur Erstellung der Spezifikation und zur Erzeugung der Testsysteme verwendet werden.</p><p>Diese Arbeit soll klären, inwieweit sich Applikationsprofile eignen, um die Anforderungen paketbasierter Datenformate zu erfassen und ob eventuell anfallende und nötige Änderungen an den unterstützenden Tools vorgenommen werden können. Dazu soll versucht werden, die Spezifikation des Virtual Company Dossiers als Applikationsprofil zu beschreiben.</p><p>Das Virtual Company Dossier ist ein paket-basiertes Format, welches innerhalb eines elektronischen Ausschreibungsprozesses verwendet wird. Es ermöglicht die Erfassung von Evidenzen, die die notwendige Qualifikation eines Bewerbers, sowie die Erfüllung der mit dem Ausschreibungsverfahren verbundenen Kriterien, nachweisen.</p><p>Um die Anwendbarkeit des Verfahrens festzustellen, sollen zuerst die Ähnlichkeiten der beiden Formate herausgearbeitet werden. Diese sollen dann für die Identifizierung der abstrakten Anforderungen dienen, die mit den gleichen, durch das Format der Applikationsprofile bereitgestellten, Formalismen festgehalten werden können. Spezielle Anforderungen des VCDs sollen, soweit es geht, mit den bereitgestellten Mitteln erfasst werden. Wenn nötig, soll das Format, und das Tool zur Erstellung von Applikationsprofilen, angepasst werden, so dass die restlichen Anforderungen des VCDs beschrieben werden können.</p><p>Die daraus resultierenden Änderungen am Prozess der Testsystem-Erzeugung sollen ebenfalls eingearbeitet werden, so dass konkrete VCD-Pakete auf Korrektheit überprüft werden können.</p>', '2016-04-10 21:29:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `calendar_modules`
--

CREATE TABLE IF NOT EXISTS `calendar_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `calendar_modules`
--

INSERT INTO `calendar_modules` (`id`, `title`) VALUES
(8, 'test');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `calendar_module_items`
--

CREATE TABLE IF NOT EXISTS `calendar_module_items` (
`id` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `description` text COLLATE latin1_german1_ci NOT NULL,
  `calendar_module` int(11) NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `calendar_module_items`
--

INSERT INTO `calendar_module_items` (`id`, `title`, `description`, `calendar_module`, `datetime`) VALUES
(60, 'Lorem Ipsum', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don''t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn''t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', 8, '2016-04-16 10:50:00'),
(61, 'werw', 'werw', 8, '2016-07-22 07:50:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contact_modules`
--

CREATE TABLE IF NOT EXISTS `contact_modules` (
`id` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `contact_modules`
--

INSERT INTO `contact_modules` (`id`, `topic`, `title`) VALUES
(26, 'Kontakt', 'Fragen Sie uns!');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gallery_modules`
--

CREATE TABLE IF NOT EXISTS `gallery_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gallery_module_image_sizes`
--

CREATE TABLE IF NOT EXISTS `gallery_module_image_sizes` (
  `size` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `gallery_module_image_sizes`
--

INSERT INTO `gallery_module_image_sizes` (`size`) VALUES
('large'),
('small');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `infotile_modules`
--

CREATE TABLE IF NOT EXISTS `infotile_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `infotile_module_tiles`
--

CREATE TABLE IF NOT EXISTS `infotile_module_tiles` (
`id` int(11) NOT NULL,
  `infotile_module` int(11) NOT NULL,
  `image_src` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `text` text COLLATE latin1_german1_ci NOT NULL,
  `image_square_src` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `url` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `url_enabled` tinyint(1) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `instagram_module_tags`
--

CREATE TABLE IF NOT EXISTS `instagram_module_tags` (
`id` int(11) NOT NULL,
  `instagram_module` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `maps_modules`
--

CREATE TABLE IF NOT EXISTS `maps_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `description` text COLLATE latin1_german1_ci NOT NULL,
  `center_latitude` double NOT NULL,
  `center_longitude` double NOT NULL,
  `marker` tinyint(1) NOT NULL,
  `marker_latitude` double NOT NULL,
  `marker_longitude` double NOT NULL,
  `zoom` int(11) NOT NULL,
  `map_type_id` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `map_type_control` tinyint(1) NOT NULL,
  `polyline` tinyint(1) NOT NULL,
  `polyline_path` text COLLATE latin1_german1_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `module_types`
--

CREATE TABLE IF NOT EXISTS `module_types` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `module_types`
--

INSERT INTO `module_types` (`id`, `name`) VALUES
('blog', 'Blog'),
('calendar', 'Kalender'),
('contact', 'Kontaktformular'),
('gallery', 'Bildergalerie'),
('infotile', 'Infokacheln'),
('instagram', 'Instagram'),
('maps', 'Google Maps Karte'),
('parallax', 'Parallax'),
('staff', 'Personal'),
('text', 'Text'),
('youtube', 'Youtube-Video');

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
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `pages`
--

INSERT INTO `pages` (`id`, `topic`, `module_type_id`, `module_id`, `y_index`) VALUES
(251, 'testseite', 'calendar', 8, -1),
(258, 'testseite', 'blog', 7, -1);

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `staff_modules`
--

CREATE TABLE IF NOT EXISTS `staff_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `text_modules`
--

INSERT INTO `text_modules` (`id`, `title`, `content`) VALUES
(114, 'Kontakt', '<p>Hier steht eine Adresse und eine Telefonnummer, Email etc.</p><p>oder benutzen Sie einfach unser Kontaktformular</p>'),
(115, 'Impressum', '<p>Hier muss noch ein Impressum hin.</p>');

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

--
-- Daten für Tabelle `topics`
--

INSERT INTO `topics` (`id`, `name`, `position`, `section`) VALUES
('contact', 'Kontakt', 0, 'foot'),
('imprint', 'Impressum', 1, 'foot'),
('testseite', 'Testseite', 1, 'head');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `email` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `password` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'test@amnohfels.de', 'e22a63fb76874c99488435f26b117e37'),
(2, 'felix@feblog.de', '5f4dcc3b5aa765d61d8327deb882cf99');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `youtube_modules`
--

CREATE TABLE IF NOT EXISTS `youtube_modules` (
`id` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `url` text COLLATE latin1_german1_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `blog_modules`
--
ALTER TABLE `blog_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `blog_module_entries`
--
ALTER TABLE `blog_module_entries`
 ADD PRIMARY KEY (`id`), ADD KEY `blog_module` (`blog_module`);

--
-- Indizes für die Tabelle `calendar_modules`
--
ALTER TABLE `calendar_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `calendar_module_items`
--
ALTER TABLE `calendar_module_items`
 ADD PRIMARY KEY (`id`), ADD KEY `calendar_module` (`calendar_module`);

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
-- Indizes für die Tabelle `infotile_modules`
--
ALTER TABLE `infotile_modules`
 ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `infotile_module_tiles`
--
ALTER TABLE `infotile_module_tiles`
 ADD PRIMARY KEY (`id`), ADD KEY `infotile_module` (`infotile_module`);

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
-- Indizes für die Tabelle `maps_modules`
--
ALTER TABLE `maps_modules`
 ADD PRIMARY KEY (`id`);

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
-- Indizes für die Tabelle `youtube_modules`
--
ALTER TABLE `youtube_modules`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `blog_modules`
--
ALTER TABLE `blog_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `blog_module_entries`
--
ALTER TABLE `blog_module_entries`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `calendar_modules`
--
ALTER TABLE `calendar_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `calendar_module_items`
--
ALTER TABLE `calendar_module_items`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT für Tabelle `contact_modules`
--
ALTER TABLE `contact_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT für Tabelle `gallery_modules`
--
ALTER TABLE `gallery_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `gallery_module_images`
--
ALTER TABLE `gallery_module_images`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `infotile_modules`
--
ALTER TABLE `infotile_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `infotile_module_tiles`
--
ALTER TABLE `infotile_module_tiles`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `instagram_modules`
--
ALTER TABLE `instagram_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `instagram_module_tags`
--
ALTER TABLE `instagram_module_tags`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `maps_modules`
--
ALTER TABLE `maps_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `pages`
--
ALTER TABLE `pages`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=259;
--
-- AUTO_INCREMENT für Tabelle `parallax_modules`
--
ALTER TABLE `parallax_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `staff_modules`
--
ALTER TABLE `staff_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `text_modules`
--
ALTER TABLE `text_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `youtube_modules`
--
ALTER TABLE `youtube_modules`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `blog_module_entries`
--
ALTER TABLE `blog_module_entries`
ADD CONSTRAINT `blog_module_entries_ibfk_1` FOREIGN KEY (`blog_module`) REFERENCES `blog_modules` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `calendar_module_items`
--
ALTER TABLE `calendar_module_items`
ADD CONSTRAINT `calendar_module_items_ibfk_1` FOREIGN KEY (`calendar_module`) REFERENCES `calendar_modules` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `gallery_module_images`
--
ALTER TABLE `gallery_module_images`
ADD CONSTRAINT `gallery_module_images_ibfk_1` FOREIGN KEY (`gallery_module`) REFERENCES `gallery_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `gallery_module_images_ibfk_2` FOREIGN KEY (`image_size`) REFERENCES `gallery_module_image_sizes` (`size`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `infotile_module_tiles`
--
ALTER TABLE `infotile_module_tiles`
ADD CONSTRAINT `infotile_module_tiles_ibfk_1` FOREIGN KEY (`infotile_module`) REFERENCES `infotile_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
