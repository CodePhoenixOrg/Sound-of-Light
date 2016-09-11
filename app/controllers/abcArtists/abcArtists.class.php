<?php
namespace SoL\Controllers;

class AbcArtists extends \Phink\MVC\TPartialController {

    protected $cmd = NULL;

    public function init()
    {
        $this->cmd = $this->model->getLettrines();
    }

    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->cmd, 1);
        $this->response->setData('abc', $this->data);
    }
    
}
