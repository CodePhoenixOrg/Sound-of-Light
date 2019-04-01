<?php

namespace SoL\Controllers;

/**
 * AbcAlbums
 * 
 * @category Play
 * @package Controllers
 * @author "David Blanchard <dblanchard1@bbox.fr>"
 * @license GPL-3.0
 * 
 * 
 */
class AbcAlbums extends \Phink\Web\UI\TControl {

    protected $stmt = null;
    protected $anchor = '';

    /**
     * Set anchor
     * 
     * @param anchor string $value 
     * 
     * @return string anchor
     */
    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
 
    /**
     * Init 
     * 
     * @return void
     */
    public function init()
    {
        $this->stmt = $this->model->getLettrines();
    }

    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, 1);
        $this->response->setData('abc', $this->data);
    }
    

	public function createObjects() {



$this->items[0] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[0]->setId("items"); 
$this->setId("abcAlbums"); 
$this->ulli1 = new \Phink\Web\UI\Widget\Plugin\TPlugin($this); 
$this->ulli1->setId("ulli1"); 

	}

	public function declareObjects() {

$this->items[0]->setName("Lettrine"); 
$this->items[0]->setContent("@lettrineItem.phtml"); 
$this->items[0]->setEnabled("true"); 
$this->items[0]->setEvent("href#solAlbums.showPlayerByAlbum(Lettrine)"); 
$this->addChild($this->items[0]);
$this->ulli1->setCss("tile"); 
$this->ulli1->setPattern("ulli"); 
$this->ulli1->setStatement($this->stmt); 
$this->ulli1->setChildren($this->items); 
$this->ulli1->setPageNum(1); 
$this->ulli1->setTiled("auto"); 
$this->addChild($this->ulli1);

	}

	public function displayHtml() {
?>
<div id="abcAlbums">
    <?php $this->ulli1->render(); ?>
</div>

<?php
	}
}
