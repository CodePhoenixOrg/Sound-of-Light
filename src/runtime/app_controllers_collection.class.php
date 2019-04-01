<?php
namespace SoL\Controllers;

class Collection extends \Phink\Web\UI\TControl
{

    protected $stmt = null;
    protected $items = [];
    protected $cn = null;
    protected $pager = null;
    protected $onclick = null;
    protected $anchor = null;
    protected $pageCount = 0;
    protected $index = 1;
    protected $letter = '';
    public $list0 = null;

    public function setPageCount($value)
    {
        $this->pageCount = $value;
    }

    public function setLetter($value)
    {
        $this->letter = $value;
    }

    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
    
    public function setOnclick($value)
    {
        $this->onclick = $value;
    }
    
    public function showArtistsByLetter($letter) 
    {
        $this->stmt = $this->model->getArtistAlbumTitleByLetter($letter);
    }

    public function showAlbumsByLetter($letter) 
    {
        $this->stmt = $this->model->getAlbumTitleByLetter($letter);
    }
    
    public function showAlbumsByDate($year) 
    {
        $this->stmt = $this->model->getAlbumTitleByYear($year);
    }
 
    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, $pagecount);
        $this->response->setData('collection', $this->data);
    }
    

	public function createObjects() {



$this->items[0] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[0]->setId("items"); 
$this->items[1] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[1]->setId("items"); 
$this->items[2] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[2]->setId("items"); 
$this->items[3] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[3]->setId("items"); 
$this->items[4] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[4]->setId("items"); 
$this->items[5] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[5]->setId("items"); 
$this->items[6] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[6]->setId("items"); 
$this->items[7] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); 
$this->items[7]->setId("items"); 
$this->setId("collection"); 
$this->list0 = new \Phink\Web\UI\Widget\Plugin\TPlugin($this); 
$this->list0->setId("list0"); 
$this->pager = new \Phink\Web\UI\Widget\Pager\TPager($this); 
$this->pager->setId("pager"); 

	}

	public function declareObjects() {

$this->items[0]->setName("Year"); 
$this->items[0]->setEnabled("true"); 
$this->addChild($this->items[0]);
$this->items[1]->setName("ArtistId"); 
$this->items[1]->setEnabled("false"); 
$this->addChild($this->items[1]);
$this->items[2]->setName("Artist"); 
$this->items[2]->setContent("@artistItem.phtml"); 
$this->items[2]->setEnabled("false"); 
$this->items[2]->setEvent("href#solPlayer.showArtist(Artist)"); 
$this->addChild($this->items[2]);
$this->items[3]->setName("AlbumId"); 
$this->items[3]->setEnabled("false"); 
$this->addChild($this->items[3]);
$this->items[4]->setName("Album"); 
$this->items[4]->setContent("@albumItem.phtml"); 
$this->items[4]->setEnabled("true"); 
$this->items[4]->setEvent("href#solPlayer.showAlbum(Artist)"); 
$this->addChild($this->items[4]);
$this->items[5]->setName("TitleId"); 
$this->items[5]->setEnabled("false"); 
$this->addChild($this->items[5]);
$this->items[6]->setName("Title"); 
$this->items[6]->setContent("@titleItem.phtml"); 
$this->items[6]->setDragHelper("@titleDragged.phtml"); 
$this->items[6]->setEnabled("true"); 
$this->items[6]->setEvent("href#solPlayer.pl.addTrack(TitleId)"); 
$this->addChild($this->items[6]);
$this->items[7]->setName("TrackPath"); 
$this->items[7]->setEnabled("false"); 
$this->addChild($this->items[7]);
$this->list0->setPattern("list"); 
$this->list0->setPivot("true"); 
$this->list0->setStatement($this->stmt); 
$this->list0->setChildren($this->items); 
$this->list0->setRowCount($this->pageCount); 
$this->list0->setPageNum($this->index); 
$this->addChild($this->list0);
$this->pager->setFor("list0"); 
$this->pager->setCaption("Albums de ma musique"); 
$this->pager->setOnclick("solPlayer.getData"); 
$this->addChild($this->pager);

	}

	public function displayHtml() {
?>
<div id="collection"  class="scroll_collection" >
    <?php $this->list0->render(); ?>
    <?php $this->pager->render(); ?>
</div>

<?php
	}
}
