import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JPanel;

class Gambar
{
	ImageIcon sagiri1 = new ImageIcon("sagiri01.png");
	ImageIcon sagiri2 = new ImageIcon("sagiri02.png");
	ImageIcon sagiri3 = new ImageIcon("sagiri03.png");
}

class ComponentMenu
{
	String[] msgLuas = {"Masukkan Alas 1: ", "Masukkan Alas 2: ", "Masukkan Tinggi: ", "Alas 1: ", "Alas 2: ", "Tinggi: ", "Luas: "};
	String[] msgKeliling = {"Masukkan A: ", "Masukkan B: ", "Masukkan C: ", "Masukkan D: ", "A: ", "B: ", "C: ", "D: ", "Keliling: "};
	String[] msgSagiri = {"Youkoso, Oniichan:) \nBantu Sagiri menghitung Luas dan Keliling \nTrapesium ya??", "Yaudah kalo gak mau, hmpph><!", "Silahkan Oniichan pilih Luas atau Keliling Trapesium", "Arigatou Oniichan! \nUdah mau bantu Sagiri.. \nHehehe :D"};
	String[] listTraps = {"Luas Trapesium", "Keliling Trapesium"};
	String judulMenu = "Menghitung Trapesium Bersama Sagiri-chan";
}

class RumusLuas
{
	int luas;
	ComponentMenu comp = new ComponentMenu();
	Gambar gmb = new Gambar();
	String[] options = {"OK"};
	JPanel panel1 = new JPanel();
	JPanel panel2 = new JPanel();
	JPanel panelTinggi = new JPanel();
	JLabel label1 = new JLabel(comp.msgLuas[0], gmb.sagiri1, JLabel.CENTER);
	JLabel label2 = new JLabel(comp.msgLuas[1], gmb.sagiri1, JLabel.CENTER);
	JLabel label3 = new JLabel(comp.msgLuas[2], gmb.sagiri1, JLabel.CENTER);
	JTextField alas1 = new JTextField(10);
	JTextField alas2 = new JTextField(10);
	JTextField tinggi = new JTextField(10);
	
	protected void getDisplayAlasSatu(){
		do {
			panel1.add(label1);
			panel1.add(alas1);
			JOptionPane.showOptionDialog(null, panel1, comp.judulMenu, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (alas1.getText().isEmpty());
	}
	
	protected void getDisplayAlasDua(){
		do {
			panel2.add(label2);
			panel2.add(alas2);
			JOptionPane.showOptionDialog(null, panel2, comp.judulMenu, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (alas2.getText().isEmpty());
	}
	
	protected void getDisplayTinggi(){
		do {
			panelTinggi.add(label3);
			panelTinggi.add(tinggi);
			JOptionPane.showOptionDialog(null, panelTinggi, comp.judulMenu, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (tinggi.getText().isEmpty());
	}
	
	protected void getDisplay(){
		getDisplayAlasSatu();
		getDisplayAlasDua();
		getDisplayTinggi();
	}
	
	protected void setLuas(){
		int alas = Integer.parseInt(alas1.getText()) + Integer.parseInt(alas2.getText());
		luas = (alas * Integer.parseInt(tinggi.getText())) / 2;
	}
	
	protected void getLuas(){
		setLuas();
		String hasil = comp.msgLuas[3] + alas1.getText() + "\n" + comp.msgLuas[4] + alas2.getText() + "\n" + comp.msgLuas[5] + tinggi.getText() + "\n" + comp.msgLuas[6] + luas;
		JOptionPane.showMessageDialog(null, hasil, comp.judulMenu, JOptionPane.OK_OPTION, gmb.sagiri1);
	}
}

class RumusKeliling
{
	int keliling;
	ComponentMenu comp = new ComponentMenu();
	Gambar gmb = new Gambar();
	String[] options = {"OK"};
	JPanel apanel = new JPanel();
	JPanel bpanel = new JPanel();
	JPanel cpanel = new JPanel();
	JPanel dpanel = new JPanel();
	JLabel alabel = new JLabel(comp.msgKeliling[0], gmb.sagiri1, JLabel.CENTER);
	JLabel blabel = new JLabel(comp.msgKeliling[1], gmb.sagiri1, JLabel.CENTER);
	JLabel clabel = new JLabel(comp.msgKeliling[2], gmb.sagiri1, JLabel.CENTER);
	JLabel dlabel = new JLabel(comp.msgKeliling[3], gmb.sagiri1, JLabel.CENTER);
	JTextField a = new JTextField(10);
	JTextField b = new JTextField(10);
	JTextField c = new JTextField(10);
	JTextField d = new JTextField(10);
	
	protected void getDisplayA(){
		do {
			apanel.add(alabel);
			apanel.add(a);
			JOptionPane.showOptionDialog(null, apanel, comp.judulMenu, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (a.getText().isEmpty());
	}
	
	protected void getDisplayB(){
		do {
			bpanel.add(blabel);
			bpanel.add(b);
			JOptionPane.showOptionDialog(null, bpanel, comp.judulMenu, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (b.getText().isEmpty());
	}
	
	protected void getDisplayC(){
		do {
			cpanel.add(clabel);
			cpanel.add(c);
			JOptionPane.showOptionDialog(null, cpanel, comp.judulMenu, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (c.getText().isEmpty());
	}
	protected void getDisplayD(){
		do {
			dpanel.add(dlabel);
			dpanel.add(d);
			JOptionPane.showOptionDialog(null, dpanel, comp.judulMenu, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (d.getText().isEmpty());
	}
	
	protected void getDisplay(){
		getDisplayA();
		getDisplayB();
		getDisplayC();
		getDisplayD();
	}
	
	protected void setKeliling(){
		keliling = Integer.parseInt(a.getText()) + Integer.parseInt(b.getText()) + Integer.parseInt(c.getText()) + Integer.parseInt(d.getText());
	}
	
	protected void getKeliling(){
		setKeliling();
		String hasil = comp.msgKeliling[4] + a.getText() + "\n" + comp.msgKeliling[5] + b.getText() + "\n" + comp.msgKeliling[6] + c.getText() + "\n" + comp.msgKeliling[7] + d.getText() + "\n" + comp.msgKeliling[8] + keliling;
		JOptionPane.showMessageDialog(null, hasil, comp.judulMenu, JOptionPane.OK_OPTION, gmb.sagiri1);
	}
}

class SagiriMenu
{
	ComponentMenu comp = new ComponentMenu();
	Gambar gmb = new Gambar();
	RumusLuas trapLuas = new RumusLuas();
	RumusKeliling trapKel = new RumusKeliling();
	
	protected void getDisplay(){
		int ask = JOptionPane.showConfirmDialog(null, comp.msgSagiri[0], comp.judulMenu, JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, gmb.sagiri1);
		
		switch(ask){
			case JOptionPane.YES_OPTION:
				String choose;
				do {
					choose = (String) JOptionPane.showInputDialog(null, comp.msgSagiri[2], comp.judulMenu, JOptionPane.OK_CANCEL_OPTION, gmb.sagiri1, comp.listTraps, comp.listTraps[0]);
					if (choose != null) {
						switch(choose){
							case "Luas Trapesium": // Luas Trapesium
							trapLuas.getDisplay();
							trapLuas.getLuas();
							break;
							case "Keliling Trapesium": // Keliling Trapesium
							trapKel.getDisplay();
							trapKel.getKeliling();
							break;
						}
					}
				} while (choose != null);
				JOptionPane.showMessageDialog(null, comp.msgSagiri[3], comp.judulMenu, JOptionPane.OK_OPTION, gmb.sagiri3);
				break;
			case JOptionPane.NO_OPTION:
				JOptionPane.showMessageDialog(null, comp.msgSagiri[1], comp.judulMenu, JOptionPane.PLAIN_MESSAGE, gmb.sagiri2);
				System.exit(0);
				break;
		}
	}
}

public class Main
{
	public static void main(String[] args) {
		SagiriMenu run = new SagiriMenu();
		run.getDisplay();
	}
}