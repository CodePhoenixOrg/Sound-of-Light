<?php
namespace Sol\Controllers;

use Phink\Web\UI\TControl;

class Home extends TControl
{
    
       
	public function createObjects() {

\Phink\TAutoloader::import($this, "Dummy");
\Phink\TAutoloader::import($this, "AbcArtists");
\Phink\TAutoloader::import($this, "AbcAlbums");
\Phink\TAutoloader::import($this, "AbcYears");

$this->setId("home"); 
$this->dummy = new \SoL\Controllers\Dummy($this); 
$this->dummy->setId("dummy"); 
$this->abcArtists = new \SoL\Controllers\AbcArtists($this); 
$this->abcArtists->setId("abcArtists"); 
$this->abcAlbums = new \SoL\Controllers\AbcAlbums($this); 
$this->abcAlbums->setId("abcAlbums"); 
$this->abcYears = new \SoL\Controllers\AbcYears($this); 
$this->abcYears->setId("abcYears"); 

	}

	public function declareObjects() {

$this->addChild($this->dummy);
$this->abcArtists->setAnchor("#abcArtists"); 
$this->addChild($this->abcArtists);
$this->abcAlbums->setAnchor("#abcAlbums"); 
$this->addChild($this->abcAlbums);
$this->abcYears->setAnchor("#abcYears"); 
$this->addChild($this->abcYears);

	}

	public function displayHtml() {
?>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="page-header">
            <?php $this->dummy->render(); ?>
        </div>
    </div>

    <!--center-->
    <div id="abcTiles">
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#artists">Artists</a></li>
            <li><a data-toggle="tab" href="#albums">Albums</a></li>
            <li><a data-toggle="tab" href="#years">Years</a></li>
        </ul>

        <div class="tab-content">
            <div id="artists" class="tab-pane active">
                <p>
                <?php $this->abcArtists->render(); ?>
                </p>
            </div>
            <div id="albums" class="tab-pane">
                <p>
                <?php $this->abcAlbums->render(); ?>
                </p>
            </div>
            <div id="years" class="tab-pane">
                <p>
                <?php $this->abcYears->render(); ?>
                </p>
            </div>

        </div>
    </div><!--/center-->
</div>

<?php
	}
}
