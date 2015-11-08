<?php 
	//Paramètres côté serveur
	
class ColorConfiguration {

    private static $_page_colors;
    private static $_panel_colors;
    private static $_diary_colors;
    private static $_grid_colors;

    //Coleurs de la page assignées au tag BODY (text, fond, liens)
    public static function pageColors() {
        if(!self::$_page_colors) {
            self::$_page_colors=array(
                    "back_color"=>"white",
                    "text_color"=>"black",
                    "link_color"=>"black",
                    "vlink_color"=>"black",
                    "alink_color"=>"blue"
            );
        }

        return self::$_page_colors;
    }

    //Couleurs des blocs et des panels (news, etc.) 
    public static function panelColors() {
        if(!self::$_panel_colors) {
            self::$_panel_colors=array(
                    "border_color"=>"#1680d9",
                    "caption_color"=>"white",
                    "back_color"=>"#E0E0E0",
                    "fore_color"=>"black"
            );
        }

        return self::$_panel_colors;
    }

    //Couleurs de l'agenda
    public static function diaryColors() {
        if(!self::$_diary_colors) {
            self::$_diary_colors=array(
                    "border_color"=>$panel_colors["border_color"],
                    "caption_color"=>$panel_colors["caption_color"],
                    "back_color"=>$panel_colors["back_color"],
                    "fore_color"=>$panel_colors["fore_color"],
                    "hl_back_color"=>"#46A0E9",
                    "hl_text_color"=>"white"
            );
        }

        return self::$_panel_colors;
    }

    //couleurs du control dbGrid
    public static function dbGridColors() {
        if(!self::$_grid_colors) {
            self::$_grid_colors=array(
                    "border_color"=>"white",
                    "header_back_color"=>"#1680d9",
                    "even_back_color"=>"#88DDFF",
                    "odd_back_color"=>"#88CCFF", 
                    "header_fore_color"=>"white",
                    "even_fore_color"=>"black",
                    "odd_fore_color"=>"black",
                    "pager_color"=>"#E0E0E0"
            );
        }

        return self::$_grid_colors;
    }	
        
        

}

?>
