<?php
namespace SoL\Controllers;

class Playlist extends \Phink\MVC\TPartialController
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

    public function init() : void
    {
        $this->user = $this->getAuthentication()->getUserId();
        $this->stmt = $this->model->getPlaylist();
    }

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
    
    public function showPlaylist(string $user) : void
    {
    }

    public function getData() : void
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, 1);
        $this->response->setData('playlist', $this->data);
    }
    
}
