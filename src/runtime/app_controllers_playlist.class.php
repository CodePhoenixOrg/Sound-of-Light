<?php
namespace SoL\Controllers;

class Playlist extends \Phink\Web\UI\TControl
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
    protected $list0 = null;
    protected $user = 1;

    public function init()
    {
        $this->user = $this->getAuthentication()->getUserId();
        $this->stmt = $this->model->getPlaylist();
    }

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
    
    public function showPlaylist($user) 
    {
    }

    public function getData()
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, 1);
        $this->response->setData('playlist', $this->data);
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
$this->setId("playlist"); 
$this->list0 = new \Phink\Web\UI\Widget\Plugin\TPlugin($this); 
$this->list0->setId("list0"); 

	}

	public function declareObjects() {

$this->items[0]->setName("pid"); 
$this->items[0]->setEnabled("false"); 
$this->addChild($this->items[0]);
$this->items[1]->setName("id"); 
$this->items[1]->setEnabled("false"); 
$this->addChild($this->items[1]);
$this->items[2]->setName("ArtistId"); 
$this->items[2]->setEnabled("false"); 
$this->addChild($this->items[2]);
$this->items[3]->setName("Artist"); 
$this->items[3]->setEnabled("false"); 
$this->addChild($this->items[3]);
$this->items[4]->setName("TitleId"); 
$this->items[4]->setEnabled("false"); 
$this->addChild($this->items[4]);
$this->items[5]->setName("Title"); 
$this->items[5]->setContent("@playlistTrack.phtml"); 
$this->items[5]->setEnabled("true"); 
$this->items[5]->setEvent("href#solPlayer.pl.removeTrack(id)"); 
$this->addChild($this->items[5]);
$this->items[6]->setName("Duration"); 
$this->items[6]->setEnabled("false"); 
$this->addChild($this->items[6]);
$this->items[7]->setName("TrackPath"); 
$this->items[7]->setEnabled("false"); 
$this->addChild($this->items[7]);
$this->list0->setPattern("ulli"); 
$this->list0->setPivot("false"); 
$this->list0->setStatement($this->stmt); 
$this->list0->setChildren($this->items); 
$this->list0->setRowCount($this->pageCount); 
$this->list0->setPageNum($this->index); 
$this->addChild($this->list0);

	}

	public function displayHtml() {
?>
<div id="playlist" class="scroll_playlist" >
    <?php $this->list0->render(); ?>
    <!--phx:TPager id="pager" for="accordion0" caption="Albums de ma musique"  onclick="solPlayer.getData"  /-->
</div>

<?php
	}
}
