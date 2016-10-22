/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
insert into artist
select distinct artistid, artist from amarokdb.v_trackf;
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;

/*!40000 ALTER TABLE `album` DISABLE KEYS */;
insert into album
select distinct albumid, album, artistid from amarokdb.v_trackf;
/*!40000 ALTER TABLE `album` ENABLE KEYS */;

/*!40000 ALTER TABLE `track` DISABLE KEYS */;
insert into track
select distinct titleid, title, duration, year, tracknumber, discnumber, bitrate, path, artistid, albumid from amarokdb.v_trackf;
/*!40000 ALTER TABLE `track` ENABLE KEYS */;
