<?php
namespace SoL\Controllers;

class AbcYears extends \Phink\Web\UI\TControl {

    protected $stmt = NULL;
    protected $anchor = '';

    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
 
    public function init() 
    {
        $this->stmt = $this->model->getYears();
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
$this->setId("abcYears"); 
$this->ulli2 = new \Phink\Web\UI\Widget\Plugin\TPlugin($this); 
$this->ulli2->setId("ulli2"); 

	}

	public function declareObjects() {

$this->items[0]->setName("Lettrine"); 
$this->items[0]->setContent("@lettrineItem.phtml"); 
$this->items[0]->setEnabled("true"); 
$this->items[0]->setEvent("href#solDates.showPlayerByDate(Lettrine)"); 
$this->addChild($this->items[0]);
$this->ulli2->setCss("tile"); 
$this->ulli2->setPattern("ulli"); 
$this->ulli2->setStatement($this->stmt); 
$this->ulli2->setChildren($this->items); 
$this->ulli2->setPageNum(1); 
$this->ulli2->setTiled("auto"); 
$this->addChild($this->ulli2);

	}

	public function displayHtml() {
?>
<div id="abcYears">
    <?php $this->ulli2->render(); ?>
</div>

<?php
	}
}
