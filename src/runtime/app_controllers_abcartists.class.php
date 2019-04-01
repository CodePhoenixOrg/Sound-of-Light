<?php
namespace SoL\Controllers;

class AbcArtists extends \Phink\Web\UI\TControl {

    protected $stmt = null;
    protected $anchor = '';

    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
 
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
$this->setId("abcArtists"); 
$this->ulli0 = new \Phink\Web\UI\Widget\Plugin\TPlugin($this); 
$this->ulli0->setId("ulli0"); 

	}

	public function declareObjects() {

$this->items[0]->setName("Lettrine"); 
$this->items[0]->setContent("@lettrineItem.phtml"); 
$this->items[0]->setEnabled("true"); 
$this->items[0]->setEvent("href#solArtists.showPlayerByArtist(Lettrine)"); 
$this->addChild($this->items[0]);
$this->ulli0->setCss("tile"); 
$this->ulli0->setPattern("ulli"); 
$this->ulli0->setStatement($this->stmt); 
$this->ulli0->setChildren($this->items); 
$this->ulli0->setPageNum(1); 
$this->ulli0->setTiled("auto"); 
$this->addChild($this->ulli0);

	}

	public function displayHtml() {
?>
<div id="abcArtists">
    <?php $this->ulli0->render(); ?>
</div>

<?php
	}
}
