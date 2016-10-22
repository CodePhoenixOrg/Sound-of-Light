<?php
namespace SoL\Controllers;

class PlayList extends \Phink\MVC\TPartialController
{

    protected $stmt = null;
    protected $cmd = null;
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
        $this->cmd = $this->model->getPlaylist(1);
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
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->cmd, 1);
        $this->response->setData('playlist', $this->data);
    }
    
}
