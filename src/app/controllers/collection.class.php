<?php
namespace SoL\Controllers;

class Collection extends \Phink\MVC\TPartialController
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

    public function setPageCount(int $value) : void
    {
        $this->pageCount = $value;
    }

    public function setLetter(string $value) : void
    {
        $this->letter = $value;
    }

    public function setAnchor(string $value) : void
    {
        $this->anchor = $value;
    }
    
    public function setOnclick(string $value) : void
    {
        $this->onclick = $value;
    }
    
    public function showArtistsByLetter(string $letter) : void
    {
        $this->stmt = $this->model->getArtistAlbumTitleByLetter($letter);
    }

    public function showAlbumsByLetter(string $letter) : void
    {
        $this->stmt = $this->model->getAlbumTitleByLetter($letter);
    }
    
    public function showAlbumsByDate(string $year) : void
    {
        $this->stmt = $this->model->getAlbumTitleByYear($year);
    }
 
    public function getData(int $pagecount, ?int $pagenum) : void
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, $pagecount);
        $this->response->setData('collection', $this->data);
    }
    
}
