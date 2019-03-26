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
class AbcAlbums extends \Phink\MVC\TPartialController {

    protected $cmd = null;
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
        $this->cmd = $this->model->getLettrines();
    }

    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->cmd, 1);
        $this->response->setData('abc', $this->data);
    }
    
}
