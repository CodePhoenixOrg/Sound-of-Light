<?php
namespace Detroit\Controllers;

/**
 * Description of logme
 *
 * @author david
 */

 class Home extends \Phoenix\Web\UI\TControl {
    //put your code here

    protected $dummy;
    protected $grid0;

	public function createObjects() {\Phoenix\TAutoloader::import("dummy");\Phoenix\TAutoloader::import("grid");\Phoenix\TAutoloader::import("TPager");$this->setId("home"); $this->dummy = new \Something\Dummy($this); $this->dummy->setId("dummy"); $this->grid0 = new \Detroit\Controllers\Grid($this); $this->grid0->setId("grid0"); $this->pager = new \Phoenix\Web\UI\TPager($this); $this->pager->setId("pager"); 	}	public function declareObjects() {$this->grid0->setAnchor("#grid"); $this->grid0->setPageCount(20); $this->pager->setFor("grid0"); $this->pager->setCaption("Albums de ma musique"); $this->pager->setOnclick("getData"); $this->pager->setPageCount(20); 	}	public function displayHtml() {?><script>$.jPhoenix.getCSS('http://www.phox.loc/app/views/home/home.css');</script><script src='http://www.phox.loc/app/controllers/home/home.js'></script><div class="container-fluid">
    <div class="row-fluid">
        <div class="span3">


        </div>
        <div class="span9">
    <!-- Modal
    ================================================== -->
            <section id="modals">
            <div class="page-header">
                &nbsp;
            </div>

            <div>
                <?php $this->dummy->render(); ?>
            </div>
                <table>
                <tr>
                    <td width="50%">
                        <div id="dataGrid" >
                            <div id="grid">
                                <?php $this->grid0->render(); ?>
                            </div>
                            <?php $this->pager->render(); ?>
                        </div>
                    </td>
                    <td width="50%">
                        <div id="vikipedia">
                            
                        </div>
                    </td>
                </tr>
                </table>
            </div>
                
            <div id="token">

            </div>


            </section>

        </div>
    </div>
</div>
<?php	}}