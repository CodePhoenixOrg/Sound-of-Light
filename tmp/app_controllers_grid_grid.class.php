<?php
namespace SoL\Controllers;

class Grid extends \Phink\Web\UI\TControl {

    protected $stmt = NULL;
    protected $cmd = NULL;
    protected $items = array();
    protected $cn = NULL;
    protected $pager = NULL;
    protected $onclick = NULL;
    protected $anchor = NULL;
    protected $pageCount = 0;
    protected $index = 1;
    public $accordion0 = NULL;

    public function setPageCount($value) {
        $this->pageCount = $value;
    }

    public function setAnchor($value) {
        $this->anchor = $value;
    }
    
    public function setOnclick($value) {
        $this->onclick = $value;
    }
    
    public function init() {
//        \Phink\Log\TLog::debug('Je passe par la !');
        $this->index = $this->request->getQueryArguments('pagenum');
        $this->pageCount = ($this->pageCount) ? $this->pageCount :  $this->request->getQueryArguments('pagecount');
        $cmd = $this->model->getArtistRange();
        
        $cmd->addSelectLimit($this->index, $this->pageCount);
        
        $stmt = $cmd->querySelect();
        $range = array();
        while($row = $stmt->fetch()) {
            array_push($range, $row[0]);
        }
        
        $this->cmd = $this->model->getArtistAlbumTitle($range);
    }

    public function getData($pagecount, $pagenum) {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->cmd, $pagecount);
        $this->response->setData('grid', $this->data);
    }
    	public function createObjects() {\Phink\TAutoloader::import("TPlugin");\Phink\TAutoloader::import("TPager");$this->items[0] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[0]->setId("items"); $this->items[1] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[1]->setId("items"); $this->items[2] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[2]->setId("items"); $this->items[3] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[3]->setId("items"); $this->items[4] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[4]->setId("items"); $this->items[5] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[5]->setId("items"); $this->items[6] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[6]->setId("items"); $this->items[7] = new \Phink\Web\UI\Widget\Plugin\TPluginChild($this); $this->items[7]->setId("items"); $this->setId("grid"); $this->accordion0 = new \Phink\Web\UI\Widget\Plugin\TPlugin($this); $this->accordion0->setId("accordion0"); $this->pager = new \Phink\Web\UI\Widget\Pager\TPager($this); $this->pager->setId("pager"); 	}	public function declareObjects() {$this->items[0]->setName("Year"); $this->items[0]->setEnabled("true"); $this->addChild($this->items[0]);$this->items[1]->setName("ArtistId"); $this->items[1]->setEnabled("false"); $this->addChild($this->items[1]);$this->items[2]->setName("Artist"); $this->items[2]->setContent("@artistItem.phtml"); $this->items[2]->setEnabled("false"); $this->items[2]->setEvent("href#home.showArtist(Artist)"); $this->addChild($this->items[2]);$this->items[3]->setName("AlbumId"); $this->items[3]->setEnabled("false"); $this->addChild($this->items[3]);$this->items[4]->setName("Album"); $this->items[4]->setContent("@albumItem.phtml"); $this->items[4]->setEnabled("true"); $this->items[4]->setEvent("href#home.showAlbum(Artist)"); $this->addChild($this->items[4]);$this->items[5]->setName("TitleId"); $this->items[5]->setEnabled("false"); $this->addChild($this->items[5]);$this->items[6]->setName("Title"); $this->items[6]->setContent("@titleItem.phtml"); $this->items[6]->setDragHelper("@titleDragged.phtml"); $this->items[6]->setEnabled("true"); $this->items[6]->setEvent("href#home.showTitle(TitleId)"); $this->addChild($this->items[6]);$this->items[7]->setName("TrackPath"); $this->items[7]->setEnabled("false"); $this->addChild($this->items[7]);$this->accordion0->setPattern("accordion"); $this->accordion0->setPivot("false"); $this->accordion0->setCommand($this->cmd); $this->accordion0->setChildren($this->items); $this->accordion0->setRowCount($this->pageCount); $this->accordion0->setPageNum($this->index); $this->addChild($this->accordion0);$this->pager->setFor("accordion0"); $this->pager->setCaption("Albums de ma musique"); $this->pager->setOnclick("home.getData"); $this->addChild($this->pager);	}	public function afterBindingObjects() {	}	public function displayHtml() {?><div id="grid">
    <?php $this->accordion0->render(); ?>
</div>
<?php $this->pager->render(); ?><?php	}}